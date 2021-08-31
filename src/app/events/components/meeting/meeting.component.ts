import {
  AfterViewInit,
  Component,
  DoCheck,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import Peer from 'peerjs';
import { interval } from 'rxjs';
import { filter, switchMap, take, tap } from 'rxjs/operators';
import { FullScreenService } from 'src/app/services/full-screen.service';
import { MeetingService } from 'src/app/services/meeting.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.scss'],
})
export class MeetingComponent implements AfterViewInit, DoCheck, OnDestroy {
  myPeerId!: string;
  peer!: Peer;
  receiverPeerId!: string;
  peerStream!: MediaStream;
  localStream!: MediaStream;
  isConnectionEstablished: boolean = false;
  peers: string[] = [];

  peerStreams: string[] = [];

  @ViewChild('peerlist')
  peerList!: ElementRef;

  userId!: string;

  currentUserPeerId!: string;

  constructor(
    private sanitizer: DomSanitizer,
    private meetingService: MeetingService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    public fullScreenService: FullScreenService
  ) {}

  ngDoCheck(): void {}

  ngAfterViewInit() {
    this.makeFullScreen();
    const meetingId = this.activatedRoute.snapshot.params.meetingId;
    this.authService.user$
      .pipe(
        filter((user) => !!user),
        tap((user) => {
          this.userId = user?.sub as string;
        }),
        switchMap(() => this.meetingService.getPeers(meetingId))
      )
      .subscribe((val: any[]) => {
        const isUserJoinedAlready = val.find(
          (item) => item.user_id === this.userId
        );
        if (!isUserJoinedAlready) {
          // new meeting
          // create uid and update for this user
          const createdPeerId = uuidv4();
          this.meetingService
            .updatePeers(meetingId, this.userId, createdPeerId)
            .subscribe();
        } else {
          // already meeting created
          // get current user peer id

          this.currentUserPeerId = isUserJoinedAlready.peer_id;
        }
        this.peer = new Peer(this.currentUserPeerId);

        /**
         * Request own video
         */
        this.requestLocalVideo({
          success: (stream: MediaStream) => {
            this.localStream = stream;
            this.onReceiveStream(stream, 'my-camera');
          },
          error: function (err: any) {
            alert('Cannot get access to your camera and video !');
            console.error(err);
          },
        });

        const otherPeers = val.filter((item) => item.user_id !== this.userId);
        this.call(otherPeers);

        // Initialization - Your Peer ID (Host) ex: app.com/meeting/t44-sad-422
        this.peer.on('open', (id: string) => {
          this.myPeerId = id;
        });

        // connection has established from peer for chat
        this.peer.on('connection', (conn) => {
          conn.on('data', (data) => {
            console.log(data);
          });
        });

        const nav = navigator as any;

        /**
         * Handle the on receive call event
         */

        this.peer.on('call', (call) => {
          // var acceptsCall = confirm(
          //   'Video call incoming, do you want to accept it ?'
          // );
          // if (acceptsCall) {
          call.answer(this.localStream);
          console.log('call answer');

          // Receive data
          call.on('stream', (remoteStream) => {
            // Store a global reference of the other user stream
            // this.peerStream = remoteStream;
            this.peerStreams.push(remoteStream.id);

            const remotePeerId = `peer-camera-${remoteStream.id}`;
            if (!this.peers.some((el) => el === remotePeerId)) {
              this.peers.push(remotePeerId);
            }

            // Display the stream of the other user in the peer-camera video element !
            this.onReceiveStream(remoteStream, remotePeerId);
          });

          // Handle when the call finishes
          call.on('close', function () {
            alert('The video call has finished');
          });
          // } else {
          //   console.log('Call denied !');
          // }
        });
      });
  }

  call(otherPeers?: any[]) {
    interval(10000)
      .pipe(take(2))
      .subscribe(() => {
        otherPeers?.forEach((item) => {
          console.log('Calling to ' + item.peer_id);
          var call = this.peer.call(item.peer_id, this.localStream);
          call?.on('stream', (stream) => {
            // this.peerStream = stream;
            this.peerStreams.push(stream.id);
            const remotePeerId = `peer-camera-${stream.id}`;
            if (!this.peers.some((el) => el === remotePeerId)) {
              this.peers.push(remotePeerId);
            }
            this.onReceiveStream(stream, remotePeerId);
          });
        });
      });

    return;

    console.log('Calling to ' + this.receiverPeerId);
    var call = this.peer.call(this.receiverPeerId, this.localStream);
    call.on('stream', (stream) => {
      this.peerStream = stream;
      const remotePeerId = `peer-camera-${stream.id}`;
      if (!this.peers.some((el) => el === remotePeerId)) {
        this.peers.push(remotePeerId);
      }
      this.onReceiveStream(stream, remotePeerId);
    });
  }

  connect() {
    var conn = this.peer.connect(this.receiverPeerId);
    // on open will be launch when you successfully connect to PeerServer
    conn.on('open', () => {
      this.isConnectionEstablished = true;
    });
  }

  onReceiveStream(stream: MediaStream, element_id: string) {
    // Retrieve the video element according to the desired
    var video: any = document.getElementById(element_id);
    if (!video) {
      return;
    }
    // Set the given stream as the video source
    video.srcObject = stream;
    // this.updateGrid();
  }

  /**
   * Starts the request of the camera and microphone
   *
   * @param {Object} callbacks
   */
  requestLocalVideo(callbacks: any) {
    const nav = navigator as any;
    nav.getUserMedia =
      nav.getUserMedia || nav.webkitGetUserMedia || nav.mozGetUserMedia;

    // Request audio an video
    nav.getUserMedia(
      { audio: true, video: true },
      callbacks.success,
      callbacks.error
    );
  }

  makeFullScreen() {
    this.fullScreenService.fullScreenToggle.next(
      !this.fullScreenService.fullScreenToggle.value
    );
  }

  ngOnDestroy(): void {
    this.peer.destroy();
    this.localStream.getTracks().forEach((val) => val.stop());
  }
}

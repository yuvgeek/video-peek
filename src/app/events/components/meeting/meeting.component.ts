import { AfterViewInit, Component } from '@angular/core';
import Peer from 'peerjs';

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.scss'],
})
export class MeetingComponent implements AfterViewInit {
  myPeerId!: string;
  peer!: Peer;
  receiverPeerId!: string;
  peerStream!: MediaStream;
  localStream!: MediaStream;
  isConnectionEstablished: boolean = false;

  ngAfterViewInit() {
    this.peer = new Peer();

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
    var getUserMedia =
      nav.getUserMedia || nav.webkitGetUserMedia || nav.mozGetUserMedia;

    this.peer.on('call', (call) => {
      var acceptsCall = confirm(
        'Video call incoming, do you want to accept it ?'
      );
      if (acceptsCall) {
        call.answer(this.localStream);

        // Receive data
        call.on('stream', (remoteStream) => {
          // Store a global reference of the other user stream
          this.peerStream = remoteStream;
          // Display the stream of the other user in the peer-camera video element !
          this.onReceiveStream(remoteStream, 'peer-camera');
        });

        // Handle when the call finishes
        call.on('close', function () {
          alert('The video call has finished');
        });
      } else {
        console.log('Call denied !');
      }
    });
  }

  call() {
    console.log('Calling to ' + this.receiverPeerId);
    var call = this.peer.call(this.receiverPeerId, this.localStream);
    call.on('stream', (stream) => {
      this.peerStream = stream;
      this.onReceiveStream(stream, 'peer-camera');
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
}

const peer = new Peer({
    key:'f0380daa-b6a9-43c6-b015-249eb77f026f',
    debug: 3
  });

  peer.on('open', () => {
    document.getElementById('my-id').textContent = peer.id;
});
 
 
 
 
 let localStream;
 var connectedCall;  
  // カメラ映像取得
  navigator.mediaDevices.getUserMedia({video: true, audio: true})
    .then( stream => {
    // 成功時にvideo要素にカメラ映像をセットし、再生
    const videoElm = document.getElementById('my-video');
    videoElm.srcObject = stream;
    videoElm.play();
    // 着信時に相手にカメラ映像を返せるように、グローバル変数に保存しておく
    localStream = stream;
  }).catch( error => {
    // 失敗時にはエラーログを出力
    console.error('mediaDevice.getUserMedia() error:', error);
    return;
  });


// 発信処理
function send()  {
  const theirID = document.getElementById('their-id').value;
  const mediaConnection = peer.call(theirID, localStream);
  setEventListener(mediaConnection);
};

// イベントリスナを設置する関数
const setEventListener = mediaConnection => {
  mediaConnection.on('stream', stream => {
    // video要素にカメラ映像をセットして再生
    const videoElm = document.getElementById('their-video')
    videoElm.srcObject = stream;
    videoElm.play();
  });

  mediaConnection.once('close', () => {
    remoteVideo.srcObject.getTracks().forEach(track => track.stop());
    remoteVideo.srcObject = null;
  });
}

  //着信処理
peer.on('call', mediaConnection => {
  
  
    mediaConnection.answer(localStream);
    setEventListener(mediaConnection);
    

  });

  function closee(){
    // ビデオ通話を終了する
    alert("未実装")
};


peer.on('close', () => {
  alert('通信が切断しました。');
});
function cheer(){
  console.log("cheer");
}
function pour(){
  console.log("pour");
}

function capture(){
   var video = document.getElementById('my-video');
  var $canvas = $('#canvas');
  
  $canvas.attr('width', video.videoWidth);
  $canvas.attr('height', video.videoHeight);
  $canvas[0].getContext('2d').drawImage(video, 0, 0, $canvas.width(), $canvas.height());
};
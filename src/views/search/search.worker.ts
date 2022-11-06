console.log('worker is on');

onmessage = function(e) {
  console.log(e);

  self.postMessage('i\'m worker!')
}
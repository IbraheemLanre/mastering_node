process.on('message', msgobj => {
  console.log('Child got message:', msgobj.text)
  process.send({
    text: `${msgobj.text} too`
  })
})
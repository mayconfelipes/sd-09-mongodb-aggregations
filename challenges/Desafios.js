// O pacote de BI de uma empresa exige que os dados sejam pré-processados ​​em um formato diferente. Uma vez que a quantidade de dados é muito maior que pode caber nos servidores RAm, isso deve ser feito usando fluxos

// Conclua as funções setupStreams que devem configurar streams para que:

// - Receba dados de datainputStream.

// - Transforme cada pedaço em um objeto e adicione um campo de id incrementado que começa do zero.

// - Grave o objeto em dataOutputStream.

// - Invoque o argumento de retorno de chamada quando o datainputStream for concluído

const stream = require('stream');

function setupStreams(dataInputStream, dataOutputStream, callback) {
  // Receba dados de datainputStream.;
  const flows = [];
  const inputs = () => { 
    if (dataInputStream.length > 1) {
      dataInputStream.map((element, item) => {
        flows.push({
          solicitation: element,
          id: item,
        })
      });
    };
  };
  
  // Transforme cada pedaço em um objeto e adicione um campo de id incrementado que começa do zero.
  
  
  // Grave o objeto em dataOutputStream.
  
  
  // Invoque o argumento de retorno de chamada quando o datainputStream for concluído
  
  return  console.log(flows, readable, writable);
}

let readable = new stream.Readable();
let writable = new stream.Writable(
  {  objectMode: true, 
     write: (chunk, encoding, callback) => {
       console.log(chunk);
       callback(null, true);
     }
});

setupStreams(readable, writable, () => console.log("onEnd"));

readable.push('{ "log": "Request received" }');
readable.push(null);

module.exports.setupStreams = setupStreams;

// Nó usado como back-end para um jogo do jogo da velha que envia dados como objetos json. A função wrapGameAction é usada para configurar assinaturas para EventEmitter que é usado para despachar várias transições de estado do jogo.

// Conclua as funções wrapGameAction que recebem os seguintes parâmetros:

// - emissor - um EventEmitter

// - actionName - nome do evento

// - callback - uma função

// A função wrapGameaction deve adicionar um ouvinte para o evento com o nome actionName para o emissor. Quando actionName é emitido, ele passa uma string JSON para o retorno de chamada do evento.

// A string json deve ser analisada e a função de retorno de chamada invocada com o objeto analisado como o argumento.

// Se a string não contém JSOn válido, a função de retorno de chamada deve ser invocada com indefinido

function wrapGameAction(emitter, actionName, callback) {
  const move = {
    emitter.emit;
  }
    // Write your code here
  
  return console.log(emitter);
}

const events = require('events');

let emitter = new events.EventEmitter();
wrapGameAction(emitter, "player_1_select", console.log);
emitter.emit("player_1_select", "{ \"row\": 1, \"column\": 1 }");

module.exports.wrapGameAction = wrapGameAction;
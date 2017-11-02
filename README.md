# frenet-node
Integração Node.js para cotação e rastreio Frenet

## Instalação
`npm install node-pagseguro`

## Quotação

### Criar objeto
```javascript
var Frenet = require('frenet-node');

var frenet = new Frenet('token');
```

### Adicionar Item
```javascript
frenet.addItem({
   weight: Number, //peso
   length: Number, //comprimento
   height: Number, //altura
   width: Number, //largura
   quantity: Number //quantidade
})
```

### Solicitar Cotação
```javascript
frenet.quote({
   cep_origin: String,
   cep_destination: String,
   value: Number
}, function(err, data) {
   
}) 
```

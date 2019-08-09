const request = require('request');

const frenet = function(token) {
    this.token = token;
    this.url = 'http://api.frenet.com.br/';
    this.items = [];
}

frenet.prototype.addItem = function(item) {
    this.items.push({
        Weight: item.weight,
        Height: item.height,
        Length: item.length,
        Width: item.width,
        Quantity: item.quantity
    })
}

frenet.prototype.quote = function(data, cb) {
    var params = {
        url: this.url + 'shipping/quote',
        headers: {
            token: this.token
        },
        json: true,
        body: {
            RecipientCEP: data.cep_destination,
            SellerCEP: data.cep_origin,
            ShipmentInvoiceValue: data.value,
            RecipientCountry: 'BR',
            ShippingItemArray: this.items
        }
    }

    request.post(params, function(err, response, body) {
        if (err) {
            return cb(err, false);
        }

        if (body && body.ShippingSevicesArray) {
            return cb(false, body.ShippingSevicesArray);
        }

        return cb(err, false);
    })
}

frenet.prototype.countItems = function() {
    return this.items.length;
}

frenet.prototype.getInfo = function(cb) {
    var params = {
        url: this.url + 'shipping/info',
        headers: {
            token: this.token
        }
    }

    request.get(params, function(err, response, body) {
        if (err) {
            return cb(err, false);
        }

        body = JSON.parse(body);
        if (body && body.ShippingSeviceAvailableArray) {
            return cb(false, body.ShippingSeviceAvailableArray);
        }

        return cb(err, false);
    })
}

module.exports = frenet;
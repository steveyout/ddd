const Telegraf = require('telegraf');
const Extra = require('telegraf/extra');
const Markup = require('telegraf/markup');
const bot = new Telegraf("717552304:AAF2MIHUlbmnf3TC4i-r-TOPMymf-uEKxdA");
const Scene = require('telegraf/scenes/base')
const session = require('telegraf/session')
const Stage = require('telegraf/stage')
const { enter,leave } = Stage
var rest = require('restler');
var btc='d63b2e5d-4e54-5990-943f-ef5788433df1'
var rates = require("bitcoin-exchange-rates");
var cron = require('node-cron');
var mysql = require('mysql');
var WAValidator = require('wallet-address-validator');
var coinbase = require('coinbase');
var Coinbase = require('coinbase');
var Client = require('coinbase').Client;
var mysecret = '8eDpUW9PJ7E16xlns9msu5vUNxth9G0A'
var mykey = 'JaH2VY37PArRPeod'
var sb = require('satoshi-bitcoin');
var client = new Client({'apiKey': mykey, 'apiSecret': mysecret});
var con = mysql.createConnection({
    host: "bi1ce9son-mysql.services.clever-cloud.com",
    user: "uolcmn8nwdgnqvia",
    password: "tGY6yHSXT3gNZ6ZvYTo",
    database:"bi1ce9son"
});
var rn = require('random-number');
var options = {
    min:  1
    , max:  100
    , integer: true
}
//server

const {createServer} = require('http')
const server = createServer(() => {})
server.listen(3000)
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

//catch error
bot.catch((err) => {
    console.log('Ooops', err)
})



//menu refferal start

bot.use(Telegraf.log());





//start
bot.command('start',ctx => {
    var message = ctx.message;
    var id = ctx.from.id;
    var start = '/start';
    con.query("SELECT id FROM account WHERE id=" + id, function (err, result, fields) {
        console.log(result.length)
        if (message.text == start&&result.length===0) {
            var chatid = ctx.from.id;
            var firstname = ctx.from.first_name;
            var bal = 0;
            var tim = new Date();
            var address = 'none';
            var refa = 411002680;
            var images='on'
            var user = {id: chatid, balance: bal, firstname: firstname, time: tim, withdrawadd: address, ref: refa,images:images};
            con.query("insert into `account` SET ?", user, function (error, results) {
                ctx.reply('welcome ' + ctx.from.first_name + ' to Bitcoin shop.\n\n🔹Own shops\n🔹Collect income\n🔹Exchange income for 💰\n🔹Earn real Money in BTC', Markup
                    .keyboard([
                        ['🏦Shops', '💵Income'], // Row1 with 2 buttons
                        ['💸Balance', '👨‍👧‍👦Refferals'], // Row2 with 2 buttons
                        ['⚖️Exchange', '📈Stastistics'],
                        ['⚙️Settings', '🎁Bonus'],
                        ['💬Chat','🎴Casino']// Row3 with 3 buttons Row3 with 3 buttons
                    ])

                    .resize()
                    .extra())
            })

        } else if (message.text.split(start)[1] == id) {
            ctx.reply('🚫You cannot refer yourself', Markup
                .keyboard([
                    ['🏦Shops', '💵Income'], // Row1 with 2 buttons
                    ['💸Balance', '👨‍👧‍👦Refferals'], // Row2 with 2 buttons
                    ['⚖️Exchange', '📈Stastistics'],
                    ['⚙️Settings', '🎁Bonus'],
                    ['💬Chat','🎴Casino']// Row3 with 3 buttons Row3 with 3 buttons
                ])

                .resize()
                .extra())
        } else if (message.text.split(start)[1] !== id) {

            var chatd = ctx.from.id
            con.query("SELECT id FROM account WHERE id=" + chatd, function (err, result, fields) {
                console.log(result.length)
                if (result.length === 0) {

                    var chatidi = ctx.from.id;
                    var firstnamee = ctx.from.first_name;
                    var bala = 0;
                    var time = new Date();
                    var addresse = 'none';
                    var images='on'
                    var refidi = message.text.split(start)[1]
                    var useri = {
                        id: chatidi,
                        balance: bala,
                        firstname: firstnamee,
                        time: time,
                        withdrawadd: addresse,
                        ref: refidi,
                        images:images
                    };
                    con.query("insert into `account` SET ?", useri)

                    var chatd = ctx.from.id
                    con.query("SELECT ref FROM account WHERE id=" + chatd, function (err, result, fields) {

                        if (result[0].ref !== refidi) {
                            var refbonus = 100;
                            var ref = 1;
                            var energy=1;
                            var refid = message.text.split(start)[1];
                            var sql = "update `account` set `balance` =`balance`+ '" + refbonus + "', friends =`friends`+ " + ref + ", payoutpoints = `payoutpoints`+" + energy + " where `id` = '" + refid + "'";



                            con.query(sql)

                            ctx.reply('welcome ' + ctx.from.first_name + ' to Bitcoin shop.\n\n🔹Own shops\n🔹Collect income\n🔹Exchange income for 💰\n🔹Earn real Money in BTC', Markup
                                .keyboard([
                                    ['🏦Shops', '💵Income'], // Row1 with 2 buttons
                                    ['💸Balance', '👨‍👧‍👦Refferals'], // Row2 with 2 buttons
                                    ['⚖️Exchange', '📈Stastistics'],
                                    ['⚙️Settings', '🎁Bonus'],
                                    ['💬Chat','🎴Casino']// Row3 with 3 buttons Row3 with 3 buttons
                                ])


                                .resize()
                                .extra())
                            con.query("SELECT id FROM account WHERE id=" + refid, function (err, result, fields) {
                                ctx.telegram.sendMessage(result[0].id, 'you have a new refferal\nyou receive:\n+100 💵\n1⚡️')


                            })
                        }
                    })

                } else if (result.length > 0) {
                    var rd = ctx.from.id
                    con.query("SELECT ref FROM account WHERE id=" + rd, function (err, result, fields) {
                        if (result[0].ref == ctx.message.text.split(start)[1]) {
                            ctx.reply('🚫you have already used this link', Markup
                                .keyboard([
                                    ['🏦Shops', '💵Income'], // Row1 with 2 buttons
                                    ['💸Balance', '👨‍👧‍👦Refferals'], // Row2 with 2 buttons
                                    ['⚖️Exchange', '📈Stastistics'],
                                    ['⚙️Settings', '🎁Bonus'],
                                    ['💬Chat','🎴Casino']// Row3 with 3 buttons Row3 with 3 buttons
                                ])

                                .resize()
                                .extra())
                        } else if (result[0].ref !== ctx.message.text.split(start)[1]) {
                            ctx.reply('???', Markup
                                .keyboard([
                                    ['🏦Shops', '💵Income'], // Row1 with 2 buttons
                                    ['💸Balance', '👨‍👧‍👦Refferals'], // Row2 with 2 buttons
                                    ['⚖️Exchange', '📈Stastistics'],
                                    ['⚙️Settings', '🎁Bonus'],
                                    ['💬Chat','🎴Casino']// Row3 with 3 buttons Row3 with 3 buttons
                                ])

                                .resize()
                                .extra())
                        }
                    })
                }
            })
        }
    })
})
//refferal
bot.hears('👨‍👧‍👦Refferals',ctx => {

    var id=ctx.from.id
    var sql = "SELECT friends,energy from `account` where `id` = '" + id + "'";
    con.query(sql, function(error, results, fields) {
        var earn=results[0].friends*100
        ctx.replyWithHTML('invite friends and get 100💰 and 1⚡️ for each friend and 30% of your friends deposit\n\n🔅Refferals: <b>'+results[0].friends+' 👥</b> \n\n 🔅earned: <b>'+earn+' 💰</b>',Extra
            .HTML()
            .markup((m) => m.inlineKeyboard([
                m.callbackButton('👤Refferal link', '👤Refferal link')

            ], { columns: 1 })))
            .then(()=>{
                ctx.reply('click 🏠menu for Mainmenu',Markup
                    .keyboard([
                        ['🏠Menu']



                    ])
                    .resize()
                    .extra())
            })

    })


})



bot.action('👤Refferal link',ctx=>{
    ctx.editMessageText('https://t.me/Bitcoin_shopbot?start='+ctx.from.id,Extra
        .HTML()
        .markup((m) => m.inlineKeyboard([
            m.callbackButton('👥Refferals', '👥Refferals')
        ], { columns: 1 })))


})

bot.action('👥Refferals',ctx=>{
    var id=ctx.from.id
    var sql = "SELECT friends from `account` where `id` = '" + id + "'";
    con.query(sql, function(error, results, fields) {
        var earn = results[0].friends * 100
        ctx.editMessageText('invite friends and get 100💰 and 1⚡️ for each friend and 25% of your friends deposit\n\n🔅Refferals: <b>' + results[0].friends + '</b> \n\n 🔅earned: <b>' + earn + '</b>',Extra
            .HTML()
            .markup((m) => m.inlineKeyboard([
                m.callbackButton('👤Refferal link', '👤Refferal link')
            ], { columns: 1 })))

    })
})
//main menu
bot.hears('🏠Menu',ctx => {
    ctx.reply('Main menu', Markup
        .keyboard([
            ['🏦Shops', '💵Income'], // Row1 with 2 buttons
            ['💸Balance', '👨‍👧‍👦Refferals'], // Row2 with 2 buttons
            ['⚖️Exchange', '📈Stastistics'],
            ['⚙️Settings', '🎁Bonus'],
            ['💬Chat','🎴Casino']// Row3 with 3 buttons Row3 with 3 buttons
        ])

        .resize()
        .extra())

})
//shops
bot.hears('🏦Shops',ctx => {
    var id=ctx.from.id
    var sql = "SELECT images from `account` where `id` = '" + id + "'";
    con.query(sql, function (error, results, fields) {

        if (results[0].images === 'on') {
            ctx.replyWithHTML('<b>Buy shop</b>\n\n Here you can buy different type of shops.\nEach shop produces different amounts of income 💵 based on its price 💰.\nYou can collect income earned by your shops at the 💵Income section of the menu.\n⚡️Vip shops produce ⚡️points which are needed for withdrawal', Extra
                .HTML()
                .markup((m) => m.inlineKeyboard([
                    m.callbackButton('🏦Buy shops', '🏦Buy shops'),
                    m.callbackButton('⚡️Vip shops', '⚡️Vip shops'),
                    m.callbackButton('🌄Images', '🌄Images'),
                    m.callbackButton('🏫My shops', '🏫My shops')

                ], {columns: 2})))
                .then(() => {
                    ctx.reply('click 🏠menu for Mainmenu', Markup
                        .keyboard([
                            ['🏠Menu']


                        ])
                        .resize()
                        .extra())

                })
        } else {
            ctx.replyWithHTML('<b>Buy shop</b>\n\n Here you can buy different type of shops.\nEach shop produces different amounts of income 💵 based on its price 💰.\nYou can collect income earned by your shops at the 💵Income section of the menu.\n⚡️Vip shops produce ⚡️points which are needed for withdrawal', Extra
                .HTML()
                .markup((m) => m.inlineKeyboard([
                    m.callbackButton('🏦Buy shops', '🏦Buy shops'),
                    m.callbackButton('⚡️Vip shops', '⚡️Vip shops'),
                    m.callbackButton('❌Images', '❌Images'),
                    m.callbackButton('🏫My shops', '🏫My shops')

                ], {columns: 2})))
                .then(() => {
                    ctx.reply('click 🏠menu for Mainmenu', Markup
                        .keyboard([
                            ['🏠Menu']


                        ])
                        .resize()
                        .extra())


                })
        }
    })
})




//images
bot.action('🌄Images',ctx=> {
    var id = ctx.from.id
    var sql = "SELECT images from `account` where `id` = '" + id + "'";
    con.query(sql, function (error, results, fields) {
        if (results[0].images === 'on') {
            con.query("UPDATE `account` set `images`='off' where `id` = '" + id + "'")
            ctx.editMessageReplyMarkup(
                {
                    inline_keyboard: [
                        [{text: '🏦Buy shops', callback_data: '🏦Buy shops'}, {
                            text: '⚡️Vip shops',
                            callback_data: '⚡️Vip shops'
                        }],
                        [{text: '❌Images', callback_data: '❌Images'}, {
                            text: '🏫My shops',
                            callback_data: '🏫My shops'
                        }]

                    ]
                },
            )
        }
    })
})
//off images
bot.action('❌Images',ctx=>{
    var id=ctx.from.id
    con.query("UPDATE `account` set `images`='on' where `id` = '" + id + "'")
    ctx.editMessageReplyMarkup(
        {inline_keyboard: [
                [{text: '🏦Buy shops', callback_data: '🏦Buy shops'},{text: '⚡️Vip shops', callback_data: '⚡️Vip shops'}],
                [{text: '🌄Images', callback_data: '🌄Images'},{text: '🏫My shops', callback_data: '🏫My shops'}]

            ]},
    )


})

//buyhouses
bot.action('🏦Buy shops',ctx=> {
    var id = ctx.from.id
    var sql = "SELECT images from `account` where `id` = '" + id + "'";
    con.query(sql, function (error, results, fields) {
        if (results[0].images === 'on') {
            ctx.replyWithPhoto({url: 'https://cdn.glitch.com/a8ee10b2-ecac-4079-8fec-9df07981d2b2%2Fstore-icon-grocery-shop-market-building-cartoon-vector-11807757.jpg?1542615929456'})
                .then(() => {
                    ctx.replyWithHTML('<b>Grocery</b>\n\n<i>price: 30 💰</i>\n<i>income: 30 💵 per hour</i>', Extra
                        .HTML()
                        .markup((m) => m.inlineKeyboard([
                            m.callbackButton('➕Buy Grocery', '➕Buy Grocery')

                        ], {columns: 2})))
                }).then(() => {
                //bookshop
                ctx.replyWithPhoto({url: 'https://cdn.glitch.com/a8ee10b2-ecac-4079-8fec-9df07981d2b2%2F9781447264262.jpg?1542615922560'})
                    .then(() => {
                        ctx.replyWithHTML('<b>Bookshop</b>\n\n<i>price:  200 💰 </i>\n<i>income:   220 💵 per hour</i>', Extra
                            .HTML()
                            .markup((m) => m.inlineKeyboard([
                                m.callbackButton('➕Buy Bookshop', '➕Buy Bookshop')

                            ], {columns: 2})))


                    }).then(() => {
                    //bakery
                    ctx.replyWithPhoto({url: 'https://cdn.glitch.com/a8ee10b2-ecac-4079-8fec-9df07981d2b2%2Fthumb_COLOURBOX30021103.jpg?1542615923416'})
                        .then(() => {
                            ctx.replyWithHTML('<b>Bakery</b>\n\n<i>price: 1500 💰 </i>\n<i>income:  1800 💵 per hour</i>', Extra
                                .HTML()
                                .markup((m) => m.inlineKeyboard([
                                    m.callbackButton('➕Buy Bakery', '➕Buy Bakery')

                                ], {columns: 2})))


                        }).then(() => {
                        //butcher
                        ctx.replyWithPhoto({url: 'https://cdn.glitch.com/a8ee10b2-ecac-4079-8fec-9df07981d2b2%2Fbutcher-shop-meat-seller-meat-eps-vectors_csp37087433.jpg?1542615921736'})
                            .then(() => {
                                ctx.replyWithHTML('<b>Butcher</b>\n\n<i>price: 5000 💰  </i>\n<i>income:  7000 💵 per hour</i>', Extra
                                    .HTML()
                                    .markup((m) => m.inlineKeyboard([
                                        m.callbackButton('➕Buy Butcher', '➕Buy Butcher')

                                    ], {columns: 2})))


                            }).then(() => {
                            //supermarket
                            ctx.replyWithPhoto({url: 'https://cdn.glitch.com/a8ee10b2-ecac-4079-8fec-9df07981d2b2%2Fvector-illustration-supermarket-grocery-store-260nw-518613133.jpg?1542615927616'})
                                .then(() => {
                                    ctx.replyWithHTML('<b>supermarket</b>\n\n<i>price: 25000 💰 </i>\n<i>income:  37000 💵 per hour</i>', Extra
                                        .HTML()
                                        .markup((m) => m.inlineKeyboard([
                                            m.callbackButton('➕Buy Supermarket', '➕Buy Supermarket')

                                        ], {columns: 2})))


                                }).then(() => {
                                //jewellary
                                ctx.replyWithPhoto({url: 'https://cdn.glitch.com/a8ee10b2-ecac-4079-8fec-9df07981d2b2%2Fa-jewelry-shop-illustration_csp12164228.jpg?1542615919394'})
                                    .then(() => {
                                        ctx.replyWithHTML('<b>Jewellery</b>\n\n<i>price: 100000 💰 </i>\n<i>income:  150000 💵 per hour</i>', Extra
                                            .HTML()
                                            .markup((m) => m.inlineKeyboard([
                                                m.callbackButton('➕Buy Jewellery', '➕Buy Jewellery')

                                            ], {columns: 2})))
                                    })
                            })
                        })
                    })
                })
            })
        } else {

            ctx.replyWithHTML('<b>Grocery</b>\n\n<i>price: 30 💰</i>\n<i>income: 30 💵 per hour</i>', Extra
                .HTML()
                .markup((m) => m.inlineKeyboard([
                    m.callbackButton('➕Buy Grocery', '➕Buy Grocery')

                ], {columns: 2})))
                .then(() => {
                    ctx.replyWithHTML('<b>Bookshop</b>\n\n<i>price:  200 💰 </i>\n<i>income:   220 💵 per hour</i>', Extra
                        .HTML()
                        .markup((m) => m.inlineKeyboard([
                            m.callbackButton('➕Buy Bookshop', '➕Buy Bookshop')

                        ], {columns: 2})))


                        .then(() => {
                            ctx.replyWithHTML('<b>Bakery</b>\n\n<i>price: 1500 💰 </i>\n<i>income:  1800 💵 per hour</i>', Extra
                                .HTML()
                                .markup((m) => m.inlineKeyboard([
                                    m.callbackButton('➕Buy Bakery', '➕Buy Bakery')

                                ], {columns: 2})))


                                .then(() => {
                                    ctx.replyWithHTML('<b>Butcher</b>\n\n<i>price: 5000 💰  </i>\n<i>income:  7000 💵 per hour</i>', Extra
                                        .HTML()
                                        .markup((m) => m.inlineKeyboard([
                                            m.callbackButton('➕Buy Butcher', '➕Buy Butcher')

                                        ], {columns: 2})))


                                        .then(() => {
                                            ctx.replyWithHTML('<b>supermarket</b>\n\n<i>price: 25000 💰 </i>\n<i>income:  37000 💵 per hour</i>', Extra
                                                .HTML()
                                                .markup((m) => m.inlineKeyboard([
                                                    m.callbackButton('➕Buy Supermarket', '➕Buy Supermarket')

                                                ], {columns: 2})))


                                                .then(() => {
                                                    ctx.replyWithHTML('<b>Jewellery</b>\n\n<i>price: 100000 💰 </i>\n<i>income:  150000 💵 per hour</i>', Extra
                                                        .HTML()
                                                        .markup((m) => m.inlineKeyboard([
                                                            m.callbackButton('➕Buy Jewellery', '➕Buy Jewellery')

                                                        ], {columns: 2})))
                                                })
                                        })
                                })
                        })
                })
        }
    })
})
//vip
bot.action('⚡️Vip shops',ctx=>{
    ctx.replyWithHTML('<b>vip shops</b>\nVIP shops can mine  ⚡️ points!\n' + 'However, to buy such shops you will  need points and 💵, and unlike ordinary shops after some days of work such shops retire.\n')
        .then(()=> {
            ctx.replyWithHTML('<b>Grocery vip: </b>(works 95 days)\n\n<i>price:  💰 1000 + ⚡️ 550  </i>\n<i>income:  + ⚡️ 7 per day</i>', Extra
                .HTML()
                .markup((m) => m.inlineKeyboard([
                    m.callbackButton('➕Buy Grocery vip', '➕Buy Grocery vip')

                ], {columns: 2})))


                .then(() => {
                    ctx.replyWithHTML('<b>Bookshop vip: </b>(works 150 days)\n\n<i>price:  💰 1200 + ⚡️ 1200  </i>\n<i>income:   + ⚡️ 10 per day</i>', Extra
                        .HTML()
                        .markup((m) => m.inlineKeyboard([
                            m.callbackButton('➕Buy Bookshop vip', '➕Buy Bookshop vip')

                        ], {columns: 2})))


                        .then(() => {
                            ctx.replyWithHTML('<b>Bakery vip: </b>(works 150 days)\n\n<i>price:  💰 2800 + ⚡️ 2800  </i>\n<i>income:    + ⚡️ 25 per day</i>', Extra
                                .HTML()
                                .markup((m) => m.inlineKeyboard([
                                    m.callbackButton('➕Buy Bakery vip', '➕Buy Bakery vip')

                                ], {columns: 2})))


                                .then(() => {
                                    ctx.replyWithHTML('<b>supermarket vip: </b> (works 95 days)\n\n<i>price:  💰 5000 + ⚡️ 10000  </i>\n<i>income:    + ⚡️ 128 per day</i>', Extra
                                        .HTML()
                                        .markup((m) => m.inlineKeyboard([
                                            m.callbackButton('➕Buy supermarket vip', '➕Buy supermarket vip')

                                        ], {columns: 2})))


                                })
                        })
                })
        })
})
//my shops&&shops
bot.hears('💵Income',ctx => {
    var ide = ctx.from.id
    var sql = "SELECT SUM(grocerymine+bookshopmine+bakerymine+butchermine+supermarketmine+jewellarymine)  from `account` where `id` = '" + ide + "'";
    con.query(sql, function (error, response, fields) {
        var sm=JSON.parse(JSON.stringify(response[0]).replace('SUM(grocerymine+bookshopmine+bakerymine+butchermine+supermarketmine+jewellarymine)', 'sum'))
        var ide = ctx.from.id
        var sql = "SELECT grocery,bookshop,bakery,butcher,supermarket,jewellary,grocerymine,bookshopmine,bakerymine,butchermine,supermarketmine,jewellarymine from `account` where `id` = '" + ide + "'";
        con.query(sql, function (error, results, fields) {

            ctx.replyWithHTML('<b>💵Income</b>\n\n<i>The shops you have purchased reside here.They produce 💵 income,which you need to collect and exchange for 💰 at the exchange section .\nBelow you can see the income that your shops have produced and collect them for exchange</i>' + '\n\n🏡<b>grocery</b>\n🔸Number: ' + results[0].grocery + '\n🔸income: ' + results[0].grocerymine + '💵' + '\n\n🏘<b>Bookshop</b>\n🔸Number: ' + results[0].bookshop + '\n🔸Produced: ' + results[0].bookshopmine + '💵' + '\n\n🏚<b>Bakery</b>\n🔸Number: ' + results[0].bakery + '\n🔸Produced: ' + results[0].bakerymine + '💵' + '\n\n🏫<b>Butcher</b>\n🔸Number: ' + results[0].butcher + '\n🔸Produced: ' + results[0].butchermine + '💵' + '\n\n🏢<b>supermarket</b>\n🔸Number: ' + results[0].supermarket + '\n🔸Produced: ' + results[0].supermarketmine + '💵' + '\n\n🏬<b>jewellary</b>\n🔸Number: ' + results[0].jewellary + '\n🔸Produced: ' + results[0].jewellarymine + '💵' + '\n\n<b>Total:</b> '+sm.sum+' 💵',Extra
                .HTML()
                .markup((m) => m.inlineKeyboard([
                    m.callbackButton('💵Collect income', '💵Collect income'),
                    m.callbackButton('⚡️Vip', '⚡️Vip'),
                ], { columns: 1 }))).then(()=> {
                ctx.reply('click 🏠Menu to go back to main menu', Markup
                    .keyboard([
                        ['🏠Menu'], // Row1 with 2 buttons
                    ])

                    .resize()
                    .extra())

            })
        })
    })
})
//Balance
bot.hears('💸Balance',ctx => {
    var id = ctx.from.id
    var sql = "SELECT balance,payout,income,time,firstname,payoutpoints from `account` where `id` = '" + id + "'";
    con.query(sql, function (error, results, fields) {
        var btc = sb.toBitcoin(results[0].payout);
        var btcAmount, currency, rates;

        rates = require('bitcoin-exchange-rates');

        btcAmount = btc.toFixed(8);

        currency = 'USD';
        rates.fromBTC(btcAmount, currency, function (err, rate) {
            ctx.replyWithHTML('<b>user: </b>' + results[0].firstname + '\n<b>Purchase balance: </b>' + results[0].balance + ' 💰\n<b>Withdraw balance: </b>' + results[0].payout + ' 💰(' + btcAmount + ' BTC)' + '<i>\n📊 ' + btcAmount + ' BTC =$ ' + rate + '</i>\n\n<b>income in Bank:</b> ' + results[0].income + '💵\n<b>Payout points: </b>'+results[0].payoutpoints+' ⚡️\n\n<b>Account creation:</b> ' + results[0].time, Extra
                .HTML()
                .markup((m) => m.inlineKeyboard([
                    m.callbackButton('💳Add BTC', '💳Add BTC'),
                    m.callbackButton('🔰Withdraw', '🔰Withdraw')
                ], {columns: 1})))

        })
    })

//transactions
    var user = ctx.from.id
    var sql = "SELECT depoaddre,txid,ref,id from `account` where `id` = '" + user + "'";
    con.query(sql, function (error, res, fields) {
        if (res[0].depoaddre.length > 1) {
            client.getAccount(btc, function (err, account) {
                account.getAddress(res[0].depoaddre, function (err, address) {
                    address.getTransactions({}, function (err, txs) {
                        if (txs.length === 0) {
                            console.log('no transactions today')
                        } else if (txs[0].id == res[0].txid) {
                            console.log('transaction already confirmed')
                        } else if (txs[0].id !== res[0].txid) {
                            var txid = txs[0].id
                            var balance = Math.round(txs[0].amount.amount * 1000000)
                            var transactions = txs[0].amount.amount
                            var chatid = ctx.from.id
                            var sqli = "update `account` set `txid` = '" + txid + "', balance = `balance`+" + balance + ", transactions = `transactions`+" + transactions + ", payoutpoints = `payoutpoints`+" + balance + " where `id` = '" + chatid + "'";
                            con.query(sqli, function (err, response) {
                                console.log(err)
                                var ref = res[0].ref
                                var refbonus = Math.round(balance * 0.30)
                                var sqla = "update `account` set `payout` = `payout`+" + refbonus + ", `payoutpoints` = `payoutpoints`+'" + refbonus + "' where `id` = '" + ref + "'";
                                con.query(sqla)
                                ctx.telegram.sendMessage(res[0].id, 'we have received your deposit of ' + transactions + ' you gain ' + balance + '💰 added to your balance and '+balance+' ⚡️ ')
                                ctx.telegram.sendMessage(ref, 'you refferal just deposited. ' + refbonus + '💰 has been added to your payout balance '+refbonus+' ⚡️ payout points')
                                ctx.telegram.sendMessage('@bitcoinshoppays', 'new deposit of ' + transactions + ' BTC by ' + ctx.from.first_name + '\n\nhttps://live.blockcypher.com/btc/address/' + res[0].depoaddre)
                            })
                        }
                    })
                })
            })
        }
    })
})

//add btc
bot.action('💳Add BTC',ctx=>{
    var user=ctx.from.id
    var sql = "SELECT `depoaddre` from `account` where `id` = '" + user + "'";
    con.query(sql, function(error, results, fields) {
        if (results[0].depoaddre.length <= 0) {
            client.getAccount(btc, function (err, account) {
                account.createAddress(null, function (err, address) {
                    var adress = address.address
                    ctx.replyWithHTML('<b>⚡Top up balance</b>\n\nYou can buy game currency for purchasing shops and (💰) using BitCoin. To top up your balance, simply send<b> any amount</b> of BTC to this address\n\n<code>' + adress + '</code>\n\nThe BTC will be automatically credited to the balance at the rate of\n' + '<b>0.1 BTC = 100,000 💰</b>\n' + '<b>0.01 BTC = 10,000 💰</b>\n' + '<b>0.001 BTC = 1,000 💰</b>\n' + '<b>0.0001 BTC = 100 💰 </b>etc.')
                    var ide =ctx.from.id
                    var sqli = "update `account` set `depoaddre` = '" + adress + "' where `id` = '" + ide + "'";
                    con.query(sqli, function (err, results) {
                        console.log(err)
                        ctx.replyWithHTML('<code>' + adress + '</code>')
                    })
                });
            });

        } else {
            var user = ctx.from.id
            var sqla = "SELECT `depoaddre` from `account` where `id` = '" + user + "'";
            con.query(sqla, function (error, results, fields) {
                ctx.replyWithHTML('<b>⚡Top up balance</b>\n\nYou can buy game currency for purchasing shops and (💰) using BitCoin. To top up your balance, simply send<b> any amount</b> of BTC to this address\n\n<code>' + results[0].depoaddre + '</code>\n\nThe BTC will be automatically credited to the balance at the rate of\n' + '<b>0.1 BTC = 100,000 💰</b>\n' + '<b>0.01 BTC = 10,000 💰</b>\n' + '<b>0.001 BTC = 1,000 💰</b>\n' + '<b>0.0001 BTC = 100 💰 etc.</b>')
                    .then(() => {
                        ctx.replyWithHTML('<code>' + results[0].depoaddre + '</code>')

                    })
            })
        }
    })


})

//myshops
bot.action('🏫My shops',ctx=> {
    var ide = ctx.from.id
    var sql = "SELECT SUM(grocerymine+bookshopmine+bakerymine+butchermine+supermarketmine+jewellarymine)  from `account` where `id` = '" + ide + "'";
    con.query(sql, function (error, response, fields) {
        var sm = JSON.parse(JSON.stringify(response[0]).replace('SUM(grocerymine+bookshopmine+bakerymine+butchermine+supermarketmine+jewellarymine)', 'sum'))
        var ide = ctx.from.id
        var sql = "SELECT grocery,bookshop,bakery,butcher,supermarket,jewellary,grocerymine,bookshopmine,bakerymine,butchermine,supermarketmine,jewellarymine from `account` where `id` = '" + ide + "'";
        con.query(sql, function (error, results, fields) {

            ctx.replyWithHTML('<b>💵Income</b>\n\n<i>The shops you have purchased reside here.They produce 💵 income,which you need to collect and exchange for 💰 at the exchange section .\nBelow you can see the income that your shops have produced and collect them for exchange</i>' + '\n\n🏡<b>grocery</b>\n🔸Number: ' + results[0].grocery + '\n🔸income: ' + results[0].grocerymine + '💵' + '\n\n🏘<b>Bookshop</b>\n🔸Number: ' + results[0].bookshop + '\n🔸Produced: ' + results[0].bookshopmine + '💵' + '\n\n🏚<b>Bakery</b>\n🔸Number: ' + results[0].bakery + '\n🔸Produced: ' + results[0].bakerymine + '💵' + '\n\n🏫<b>Butcher</b>\n🔸Number: ' + results[0].butcher + '\n🔸Produced: ' + results[0].butchermine + '💵' + '\n\n🏢<b>supermarket</b>\n🔸Number: ' + results[0].supermarket + '\n🔸Produced: ' + results[0].supermarketmine + '💵' + '\n\n🏬<b>jewellary</b>\n🔸Number: ' + results[0].jewellary + '\n🔸Produced: ' + results[0].jewellarymine + '💵' + '\n\n<b>Total:</b> ' + sm.sum + ' 💵', Extra
                .HTML()
                .markup((m) => m.inlineKeyboard([
                    m.callbackButton('💵Collect income', '💵Collect income'),
                    m.callbackButton('⚡️Vip', '⚡️Vip'),
                ], {columns: 1}))).then(() => {
                ctx.reply('click 🏠Menu to go back to main menu', Markup
                    .keyboard([
                        ['🏠Menu'], // Row1 with 2 buttons
                    ])

                    .resize()
                    .extra())
            })
        })
    })
})







//vip
bot.action('⚡️Vip',ctx=>{
    var ide = ctx.from.id
    var sql = "SELECT SUM(groceryvipmine+bookshopvipmine+bakeryvipmine+supermarketvipmine)  from `account` where `id` = '" + ide + "'";
    con.query(sql, function (error, response, fields) {
        var sm = JSON.parse(JSON.stringify(response[0]).replace('SUM(groceryvipmine+bookshopvipmine+bakeryvipmine+supermarketvipmine)', 'sum'))
        var ide = ctx.from.id
        var sql = "SELECT groceryvip,bookshopvip,bakeryvip,supermarketvip,groceryvipmine,bookshopvipmine,bakeryvipmine,supermarketvipmine from `account` where `id` = '" + ide + "'";
        con.query(sql, function (error, results, fields) {

            ctx.replyWithHTML('<b>⚡️Vip shops</b>\n\n<i>The ⚡️Vip shops you have purchased reside here.They produce ⚡️ points,which you need to collect  .\nBelow you can see the ⚡️ that your shops have produced and collect them </i>' + '\n\n🏡<b>groceryvip</b>\n🔸Number: ' + results[0].groceryvip + '\n🔸income: ' + results[0].groceryvipmine + '⚡️' + '\n\n🏘<b>Bookshopvip</b>\n🔸Number: ' + results[0].bookshopvip + '\n🔸Produced: ' + results[0].bookshopvipmine + '⚡️' + '\n\n🏚<b>Bakeryvip</b>\n🔸Number: ' + results[0].bakeryvip + '\n🔸Produced: ' + results[0].bakeryvipmine + '⚡️'   + '\n\n🏢<b>supermarketvip</b>\n🔸Number: ' + results[0].supermarketvip + '\n🔸Produced: ' + results[0].supermarketvipmine + '⚡️' + '\n\n<b>Total:</b> ' + sm.sum + ' ⚡️', Extra
                .HTML()
                .markup((m) => m.inlineKeyboard([
                    m.callbackButton('⚡Collect points', '⚡Collect points')
                ], {columns: 1})))


        })
    })
})

//buy shops
bot.action('➕Buy Grocery',ctx =>{
    var user=ctx.from.id
    var sql = "SELECT `balance` from `account` where `id` = '" + user + "'";
    con.query(sql, function(error, results, fields) {
        if (results[0].balance>=30){
            var amount=30 ;
            var chick=1;
            var sqli = "update `account` set `balance` = `balance`-" + amount + ", `grocery` = `grocery`+'" + chick + "' where `id` = '" + user + "'";
            con.query(sqli,function (err,result) {
                ctx.replyWithHTML('<b>💫Success</b>\n\n<b>grocery</b> has been purchased,now you need to collect income produced by your shop.You can buy as many different or identical shops as you like!')

            })


        }else {
            ctx.answerCbQuery(`you dont have enough funds to ${ctx.match}`)
        }
    })



})

//bookshop
bot.action('➕Buy Bookshop',ctx =>{
    var user=ctx.from.id
    var sql = "SELECT `balance` from `account` where `id` = '" + user + "'";
    con.query(sql, function(error, results, fields) {
        if (results[0].balance>=200){
            var amount=200;
            var chick=1;
            var sqli = "update `account` set `balance` = `balance`-" + amount + ", `bookshop` = `bookshop`+'" + chick + "' where `id` = '" + user + "'";
            con.query(sqli,function (err,result) {
                ctx.replyWithHTML('<b>💫Success</b>\n\n<b>bookshop</b> has been purchased,now you need to collect income produced by the shop.You can buy as many different or identical shops as you like!')

            })


        }else {
            ctx.answerCbQuery(`you dont have enough funds to ${ctx.match}`)
        }
    })



})
//bakery
bot.action('➕Buy Bakery',ctx =>{
    var user=ctx.from.id
    var sql = "SELECT `balance` from `account` where `id` = '" + user + "'";
    con.query(sql, function(error, results, fields) {
        if (results[0].balance>=1500){
            var amount=1500;
            var chick=1;
            var sqli = "update `account` set `balance` = `balance`-" + amount + ", `bakery` = `bakery`+'" + chick + "' where `id` = '" + user + "'";
            con.query(sqli,function (err,result) {
                ctx.replyWithHTML('<b>💫Success</b>\n\n<b>bakery</b> has been purchased,now you need to collect income produced by the shop.You can buy as many different or identical shops as you like!')

            })


        }else {
            ctx.answerCbQuery(`you dont have enough funds to ${ctx.match}`)
        }
    })



})
//butcher
bot.action('➕Buy Butcher',ctx =>{
    var user=ctx.from.id
    var sql = "SELECT `balance` from `account` where `id` = '" + user + "'";
    con.query(sql, function(error, results, fields) {
        if (results[0].balance>=5000 ){
            var amount=5000 ;
            var chick=1;
            var sqli = "update `account` set `balance` = `balance`-" + amount + ", `butcher` = `butcher`+'" + chick + "' where `id` = '" + user + "'";
            con.query(sqli,function (err,result) {
                ctx.replyWithHTML('<b>💫Success</b>\n\n<b>butcher</b> has been purchased,now you need to collect income produced by the shop.You can buy as many different or identical shops as you like!')

            })


        }else {
            ctx.answerCbQuery(`you dont have enough funds to ${ctx.match}`)
        }
    })



})
//supermarket
bot.action('➕Buy Supermarket',ctx =>{
    var user=ctx.from.id
    var sql = "SELECT `balance` from `account` where `id` = '" + user + "'";
    con.query(sql, function(error, results, fields) {
        if (results[0].balance>=25000 ){
            var amount=25000 ;
            var chick=1;
            var sqli = "update `account` set `balance` = `balance`-" + amount + ", `supermarket` = `supermarket`+'" + chick + "' where `id` = '" + user + "'";
            con.query(sqli,function (err,result) {
                ctx.replyWithHTML('<b>💫Success</b>\n\n<b>supermarket</b> has been purchased,now you need to collect income produced by the shop.You can buy as many different or identical shops as you like!')

            })


        }else {
            ctx.answerCbQuery(`you dont have enough funds to ${ctx.match}`)
        }
    })



})
//jewellary
bot.action('➕Buy Jewellery',ctx =>{
    var user=ctx.from.id
    var sql = "SELECT `balance` from `account` where `id` = '" + user + "'";
    con.query(sql, function(error, results, fields) {
        if (results[0].balance>=100000){
            var amount=100000;
            var chick=1;
            var sqli = "update `account` set `balance` = `balance`-" + amount + ", `jewellary` = `jewellary`+'" + chick + "' where `id` = '" + user + "'";
            con.query(sqli,function (err,result) {
                ctx.replyWithHTML('<b>💫Success</b>\n\n<b>jewellary</b> has been purchased,now you need to collect income produced by the shop.You can buy as many different or identical shops as you like!')

            })


        }else {
            ctx.answerCbQuery(`you dont have enough funds to ${ctx.match}`)
        }
    })



})
//buyvip




















//cron work
//grocery
cron.schedule('*/59 * * * *', () => {
    var production=30;
    var bal=1;
    con.query("update `account` set `grocerymine` =`grocerymine`+`grocery`* '" + production + "' where `grocery` >= '" + bal + "'")

})
//bokshop
cron.schedule('*/59 * * * *', () => {
    var production=220;
    var bal=1;
    con.query("update `account` set `bookshopmine` =`bookshopmine`+`bookshop`* '" + production + "' where `bookshop` >= '" + bal + "'")

})
//butcher
cron.schedule('*/59 * * * *', () => {
    var production=7000;
    var bal=1;
    con.query("update `account` set `butchermine` =`butchermine`+`butcher`* '" + production + "' where `butcher` >= '" + bal + "'")

})

//supermarket
cron.schedule('*/59 * * * *', () => {
    var production=37000;
    var bal=1;
    con.query("update `account` set `supermarketmine` =`supermarketmine`+`supermarket`* '" + production + "' where `supermarket` >= '" + bal + "'")

})
//bakery
cron.schedule('*/59 * * * *', () => {
    var production=1800;
    var bal=1;
    con.query("update `account` set `bakerymine` =`bakerymine`+`bakery`* '" + production + "' where `bakery` >= '" + bal + "'")

})
//jewellary
cron.schedule('*/59 * * * *', () => {
    var production=150000 ;
    var bal=1;
    con.query("update `account` set `jewellarymine` =`jewellarymine`+`jewellary`* '" + production + "' where `jewellary` >= '" + bal + "'")

})
//online
cron.schedule('*/1 * * * * *', () => {
    var id=411002680;
    var idle=1;
    con.query("update `account` set `idle` = '" + idle + "' where `id` = '" + id + "'")

})
//days on
cron.schedule('0 0 0 * * *', () => {
    con.query('update account set `started`=`started`+1 WHERE `id`=411002680')

})
//vip
//grocery vip
cron.schedule('0 0 0 * * *', () => {
    var production=7;
    var bal=1;
    con.query("update `account` set `groceryvipmine` =`groceryvipmine`+`groceryvip`* '" + production + "' where `groceryvip` >= '" + bal + "'")

})
//bookshopvip
cron.schedule('0 0 0 * * *', () => {
    var production=10;
    var bal=1;
    con.query("update `account` set `bookshopvipmine` =`bookshopvipmine`+`bookshopvip`* '" + production + "' where `bookshopvip` >= '" + bal + "'")

})
//bakeryvip
cron.schedule('0 0 0 * * *', () => {
    var production=25;
    var bal=1;
    con.query("update `account` set `bakeryvipmine` =`bakeryvipmine`+`bakeryvip`* '" + production + "' where `bakeryvip` >= '" + bal + "'")

})
//supermarketvip
cron.schedule('0 0 0 * * *', () => {
    var production=128;
    var bal=1;
    con.query("update `account` set `supermarketvipmine` =`supermarketvipmine`+`supermarketvip`* '" + production + "' where `supermarketvip` >= '" + bal + "'")

})






bot.startPolling()
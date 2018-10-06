'use strict'

module.exports.detect = function() {
    if (typeof window.web3 === 'undefined') {
        return Promise.resolve({
            walletAvailable: false
        })
    } else {
        const { web3 } = window

        let response = {
            walletAvailable: true
        }

        return new Promise((resolve, reject) => {
            web3.version.getNetwork((err, networkId) => {
                if (err)
                    reject(err)
                else {
                    response.networkId = networkId
                    resolve()
                }
            })
        })
        .then(() => {
            return new Promise((resolve, reject) => {
                web3.eth.getAccounts((err, accounts) => {
                    if (err)
                        reject(err)
                    else {
                        response.accounts = accounts
                        if (accounts.length === 0) {
                            response.walletUnlocked = false
                        } else {
                            response.walletUnlocked = true
                        }
                        resolve(response)
                    }
                })
            })
        })
    }
}
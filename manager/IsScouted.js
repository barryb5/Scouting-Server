const Manager = require('./Manager.js')

class IsScouted extends Manager {
    static name = `isScouted`

    constructor() {
        super()
        this.result = []
    }

    runTask(tournamentKey, matchKey) {
        let errorCode = 400

        let a = this

        return new Promise(async (resolve, reject) => {
            let matches = await a.getMatchKeys(tournamentKey, matchKey)
            .catch((err) => {
                if (err) {
                    reject({
                        "results": err,
                        "customCode": errorCode
                    })
                }
            })

            if (matches === undefined) {
                let errorCode = 406
                reject({
                    "results": 'Something went wrong',
                    "customCode": errorCode
                })
            } else {
                matches.forEach(scouter => {
                    a.result.push(scouter)
                });
                
                resolve(a.result)
            }
        })
    }

    async getMatchKeys(tournamentKey, matchKey) {
        let sql = `SELECT matches.key, name FROM matches
            LEFT JOIN data ON matches.key = data.matchKey
            LEFT JOIN scouters ON data.scouterName = scouters.name
            WHERE matches.tournamentKey = '${tournamentKey}'
            AND INSTR(matches.key, '${matchKey}_')
            `

        return new Promise((resolve, reject) => {
            Manager.db.all(sql, (err, matches) => {
                if (err) {
                    let errorCode = 500
                    console.log(err)
                    reject(err)
                }
                if (matches) {
                    resolve(matches)
                } else {
                    let errorCode = 406
                    reject('No matches found')
                }
            })      
        })
    }

}

module.exports = IsScouted
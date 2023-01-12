const { difference } = require('d3')
const BaseAnalysis = require('../../BaseAnalysis.js')
const teamStat = require('./defenseEvents.js')
const all = require('./defenseEventAll.js')
const difference = require('./defenseEventDifference.js')

// const Manager = require('./manager/dbmanager.js')

class defenseOverview extends BaseAnalysis {
    static name = `defenseOverview`

    constructor(db, team, type) {
        super(db)
        this.team = team
        this.type = type
        // this.teamKey = "frc" + team
        // this.start = start
        // this.end = end
        this.all = 0
        this.array = []
        this.value = 0
        this.difference = 0
        // this.array = []

    }
    async getAccuracy() {
        let a = this
        let x = new teamStat(a.db, a.team, a.type)
        await x.runAnalysis()
        a.value = x.result
        a.array = x.array
        let y = new all(a.db, a.type)
        await y.runAnalysis()
        y.all = y.result
        let z = new difference(a.db,a.team, a.type)
        await z.runAnalysis()
        z.difference = z.result

    }


    runAnalysis() {
        return new Promise(async (resolve, reject) => {
            let a = this
            var temp = await a.getAccuracy().catch((err) => {
                if (err) {
                    return err
                }
            })
            // a.result = temp  
            resolve("done")
        })

    }
    finalizeResults() {
        return {
            "all": this.all,
            "difference" : this.difference,
            "average" : this.average,
            "array" : this.array,
            "team": this.team,
        }
    }

}
module.exports = defenseOverview

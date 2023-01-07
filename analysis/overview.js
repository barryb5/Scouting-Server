const BaseAnalysis = require('./BaseAnalysis.js')
const Manager = require('../manager/dbmanager.js')
// const AverageForMetric = require('./analysis/AverageForMetric.js')
// const TeamsInTournament = require('./analysis/TeamsInTournament.js')
// const BestAverageForMetric = require('./analysis/BestAverageForMetric.js')
// const Overveiw = require('./overview.js')
// const FullyScouted = require('./analysis/fullyScouted.js')
const defenseAmmount = require('./defenseQuantity.js')
const defenseQuality = require('./defenseQuality.js')
const notes = require('./notes.js')
const climberSucsess = require('./climberSucsess.js')
const climberMax = require('./climberMax.js')
const cargoCount = require('./cargoCount.js')
const cargoAccuracy = require('./cargoAccuracy.js')
const averageScore = require('./averageScore.js')

<<<<<<< HEAD
=======
// const { i } = require('mathjs')


//2022cc_qm3_2	


>>>>>>> add8475 (overview should work)
class overview extends BaseAnalysis {
    static name = `overview`

    constructor(db, team) {
        super(db)
        this.team = team
        this.teamKey = "ftc" + team
        // this.notes = []
        // this.scoresOverTime = []
        // this.defenseQuantity = 0
        // this.defenseQuality = 0
        // this.ballCount = 0
        // this.autoCount = 0
        this.defenseQuality
    }
    async getData()
    {
        let a = this
        return new Promise(async(resolve, reject) =>
        {
            
            //why does await not work when it works in  bestAverageForMetric
            let metrics = {}
            // console.log(result)

            var defenseFreq = new defenseAmmount(a.db, a.team)
                await defenseFreq.runAnalysis()
                metrics.defenseQuantity = defenseFreq.finalizeResults().result

            var defenseQaul = new defenseQuality(a.db, a.team)
                await defenseQaul.runAnalysis()
                metrics.defenseQuality = defenseQaul.finalizeResults().result

            var accuracy = new cargoAccuracy(a.db, a.team)
                await accuracy.runAnalysis()
                metrics.cargoAccuracy = accuracy.finalizeResults().result
            var ballCount = new cargoCount(a.db, a.team)
                await ballCount.runAnalysis()
                metrics.cargoCount = ballCount.finalizeResults().result
            var climber = new climberMax(a.db, a.team)

                await climber.runAnalysis()

                metrics.climberMax = climber.finalizeResults().result
            var climberS = new climberSucsess(a.db, a.team)
                await climberS.runAnalysis()
                metrics.climberSucsesses = climberS.finalizeResults().result

            var scores = new averageScore(a.db, a.team)
                await scores.runAnalysis()
                metrics.arrayScores = scores.finalizeResults().result
            
            
            var note = new notes(a.db, a.team)
                await note.runAnalysis()
                const notesOutput = note.finalizeResults().result


<<<<<<< HEAD
            resolve(result)
<<<<<<< HEAD
<<<<<<< HEAD
=======

            
           
                

=======
            resolve({metrics, notes: notesOutput})
>>>>>>> 24fe48f (feat: use preferred formatting for `overview`)
        })
        .catch((err) => {
            if (err) {
                console.log(err)
                return err
            }
        })
        .then((data) => {
            // console.log(data)
            return data
>>>>>>> 33dc9ae (fixed overview hopefully)
=======
>>>>>>> 8800670 (Fix overview)
        })
            .catch((err) => {
                if (err) {
                    return err
                }
            })
            .then((data) => {
                // console.log(data)
                return data
            })
    }
    runAnalysis()
    {
        let a = this
        return new Promise(async (resolve, reject) =>
        {
            a.getData()
                .then((data) => {
                    a.result = data;
                    resolve("done");
                })
                .catch((err) => {
                    if (err) {
                        reject(err);
                        return err;
                    }
                });
        })
        
    }
    finalizeResults()
    {
        return { 
            "result": this.result,
            "team": this.team
        }
    }
}
module.exports = overview
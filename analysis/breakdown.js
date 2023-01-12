const BaseAnalysis = require('./BaseAnalysis.js')
const Manager = require('../manager/dbmanager.js')
// const AverageForMetric = require('./analysis/AverageForMetric.js')
// const TeamsInTournament = require('./analysis/TeamsInTournament.js')
// const BestAverageForMetric = require('./analysis/BestAverageForMetric.js')
// const Overveiw = require('./overview.js')
// const FullyScouted = require('./analysis/fullyScouted.js')
// const defenseAmmount = require('./defenseQuantity.js')
// const defenseQuality = require('./defenseQuality.js')
const notes = require('./general/notes.js')
const cargoCount = require('./teleop/cargo/cargoCount.js')
const climberSucsess = require('./teleop/climber/climberSucsess')
const climberSucsessAuto = require('./climb/climberSucsessAuto')
const averageScore = require('./general/averageScore.js')
const cargoCountAuto = require('./auto/cargo/cargoCountAuto.js')
const robotRole = require('./general/robotRole')
const cycling = require('./teleop/cargo/cycling.js')
const defense = require('./defense/defenseEvents.js')
const cli = require('npm/lib/cli.js')



// const { i } = require('mathjs')


//2022cc_qm3_2	


class breakdown extends BaseAnalysis {
    static name = `breakdown`

    constructor(db, team) {
        super(db)
        this.team = team
        this.teamKey = "ftc" + team
        this.defenseQuality
    }
    async getData() {
        let a = this

        return new Promise(async (resolve, reject) => {

            let metrics = {}

            var climber = new climberSucsess(a.db, a.team)
            await climber.runAnalysis()
            metrics.climberOff = climber.finalizeResults().failed
            metrics.climberTipped = climber.finalizeResults().tipped
            metrics.climberSucsess = climber.finalizeResults().level
            metrics.noClimb = climber.finalizeResults().noClimb

            var climberAuto = new climberSucsessAuto(a.db, a.team)
            await climberAuto.runAnalysis()
            metrics.climberOffAuto = climberAuto.finalizeResults().failed
            metrics.climberTippedAuto = climberAuto.finalizeResults().tipped
            metrics.climberSucsessAuto = climberAuto.finalizeResults().level
            metrics.noClimbAuto = climberAuto.finalizeResults().noClimb
           
            var role = new robotRole(a.db, a.team)
            await role.runAnalysis()
            metrics.defenseRole = role.defense
            metrics.offenseRole = role.offense
            metrics.mixedRole = role.mixed
            metrics.helperRole = role.helper
          

            
           

            resolve({ metrics, notes: notesOutput })
        })
    }

    runAnalysis() {
        let a = this
        return new Promise(async (resolve, reject) => {
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
    finalizeResults() {
        return {
            "result": this.result,
            "team": this.team
        }
    }

}
module.exports = breakdown
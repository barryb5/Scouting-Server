const Manager = require('./manager/dbmanager.js')
// const AverageForMetric = require('./analysis/AverageForMetric.js')
// const AverageForMetric = require('./analysis/AverageForMetric.js')
const TeamsInTournament = require('./analysis/TeamsInTournament.js')
const BestAverageForMetric = require('./analysis/random/BestAverageForMetric.js')
const BestAverageForMetric = require('./analysis/random/BestAverageForMetric.js')
//const Overview = require('./overview.js')
const fullyScouted = require('./analysis/general/fullyScouted.js')

const notes = require('./analysis/general/notes.js')
const scores = require('./analysis/general/averageScore.js')
const fullyScouted = require('./analysis/general/fullyScouted.js')

const notes = require('./analysis/general/notes.js')
const scores = require('./analysis/general/averageScore.js')
const predictWinning = require('./analysis/predictWinning.js')
const overview = require('./analysis/catergoryMetrics.js')
const positionalAccuracy = require('./analysis/positionalAccuracy.js')
const positionalCount = require('./analysis/positionalCount.js')

const averageScoreDifference = require('./analysis/general/averageScoreDifference.js')
const averageScoreAll = require('./analysis/general/averageScoreAll.js')
const cargoCount = require('./analysis/teleop/cargo/cargoCount.js')
const cargoCountAll = require('./analysis/teleop/cargo/cargoCountAll.js')
const cargoCountDifference = require('./analysis/teleop/cargo/cargoCountDifference.js')
const climberSucsess = require('./analysis/teleop/climber/climberSucsess.js')
const climberSucsessAuto = require('./analysis/auto/climb/climberSucsessAuto.js')
const cargoCountAutoAll = require('./analysis/auto/cargo/cargoCountAutoAll.js')
const cargoCountAuto = require('./analysis/auto/cargo/cargoCountAuto.js')
const cargoCountAutoDifference = require('./analysis/auto/cargo/cargoCountAutoDifference.js')
const climberSucsessAll = require('./analysis/teleop/climber/climberSucsessAll.js')
const climberSucsessDifference = require('./analysis/teleop/climber/climberSucsessDifference.js')
const climberSucsessAutoAll = require('./analysis/auto/climb/climberSucsessAutoAll.js')
const climberSucsessAutoDifference = require('./analysis/auto/climb/climberSucsessAutoDifference.js')
const robotRole = require('./analysis/general/robotRole')
const cycling = require('./analysis/teleop/cargo/cycling.js')
const cyclingAll = require('./analysis/teleop/cargo/cyclingAll.js')
const cyclingDifference = require('./analysis/teleop/cargo/cyclingDifference.js')
const defenseEvents = require('./analysis/defense/defenseEvents.js')
const defenseEventAll = require('./analysis/defense/defenseEventAll.js')
const defenseEventDifference = require('./analysis/defense/defenseEventDifference.js')
const cyclingOverview = require('./analysis/teleop/cargo/cyclingOverview.js')
const cargoCountAutoOverview = require('./analysis/auto/cargo/cargoCountAutoOverview.js')
const cargoCountOverview = require('./analysis/teleop/cargo/cargoCountOverview.js')
const categoryMetrics = require('./analysis/catergoryMetrics.js')
const breakdown = require('./analysis/breakdown.js')
const defenseOverview = require('./analysis/defense/defenseOverview.js')











class TaskManager {

    runTasks(tasks) {
        if (tasks.length <= 0) {
            console.log(`No tasks provided`)
            return `No tasks provided`
        }
        let a = this

        return new Promise(async (resolve, reject) => {
            let analysis
            let results = []

            // Add tasks
            analysis = a.addTasks(tasks)

            for (var i = 0; i < analysis.length; i++) {
                // Run tasks
                await analysis[i].runAnalysis()
            }

            for (var i = 0; i < analysis.length; i++) {
                // Resolve results when they've all finished
                // console.log(analysis[i].finalizeResults())
                results.push(analysis[i].finalizeResults())
            }
            resolve(results)
        })
            .catch((err) => {
                if (err) {
                    return err
                }
            })
            .then((results) => {
                return results
            })
            .catch((err) => {
                if (err) {
                    return err
                }
            })
            .then((results) => {
                return results
            })
    }

    addTasks(tasks) {
        let returnAnalysis = []

        tasks.forEach((task) => {
            switch (task.name) {
                
                    
               
                 
                //here

                case(cyclingOverview.name):
                    returnAnalysis.push(new cyclingOverview(Manager.db, task.team, task.type, task.location))
                    break
                case(cargoCountAutoOverview.name):
                    returnAnalysis.push(new cargoCountAutoOverview(Manager.db, task.team, task.type))
                    break
                case(cargoCountOverview.name):
                    returnAnalysis.push(new cargoCountOverview(Manager.db, task.team, task.type))
                    break
                case(categoryMetrics.name):
                    returnAnalysis.push(new categoryMetrics(Manager.db, task.team))
                    break
                case(breakdown.name):
                    returnAnalysis.push(new breakdown(Manager.db, task.team))
                    break
                case(defenseOverview.name):
                    returnAnalysis.push(new defenseOverview(Manager.db, task.team, task.type))
                    break
                case(robotRole.name):
                    returnAnalysis.push(new robotRole(Manager.db, task.team))
                    break






                default:


                    console.log(`${task.name} is not a valid task`)
            }
        })

        return returnAnalysis
    }
}

module.exports = TaskManager
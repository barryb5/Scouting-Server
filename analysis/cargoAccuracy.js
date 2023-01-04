const BaseAnalysis = require('./BaseAnalysis.js')
// const Manager = require('./manager/dbmanager.js')

class cargoAccuracy extends BaseAnalysis {
    static name = `cargoAccuracy`

    constructor(db, team) {
        super(db)
        this.team = team
        this.teamKey = "frc" + team
        // this.start = start
        // this.end = end
        this.result = 0
        this.array = []
        
    }
    async getAccuracy()
    {
        let a = this
        return new Promise(async function(resolve, reject)
        {

                var sql = `SELECT scoutReport
                FROM data
            JOIN (SELECT matches.key
                FROM matches 
                JOIN teams ON teams.key = matches.teamKey
                WHERE teams.teamNumber = ?) AS  newMatches ON  data.matchKey = newMatches.key
          `;
                a.db.all(sql, [a.team], (err, rows) =>
                {
                    if(err)
                    {
                        console.log(err)
                    }
                    let arr = []
                    let len = 0
                    let makes = 0
                    rows.forEach(functionAdder);
                    function functionAdder(row, index, array){
                        let curr = JSON.parse(row.scoutReport).events
                        let lenTemp = 0
                        let makesTemp = 0
                        for(var i = 0; i < curr.length; i++) {
                           
                            let subArr = curr[i]
                            if(subArr[1] === 1)
                            {
                                lenTemp++
                                len++
                            }
                            if (subArr[1] === 0) {
                                makesTemp++
                                lenTemp++
                              makes++
                              len++
                            }
                        }
                        arr.push(makesTemp/lenTemp)
                       
                    }
                    // console.log(makes/len)
                    a.array = arr
                    a.result = makes/len   
                    resolve("done") 
                    
                })
                   
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
            return new Promise(async (resolve, reject) =>
            {
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
        finalizeResults()
        {
            return { 
                "result": this.result,
                "team": this.team,
                "array" : this.array
            }
        }

}
module.exports = cargoAccuracy

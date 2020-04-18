
var searchButton = document.getElementById('submit');


searchButton.onclick = function() {
    var searchTerm = document.getElementById("searchTerm").value;
    console.log(searchTerm);
        
    if(searchTerm){
            
        
        //fetch nba api data
        fetch("https://www.balldontlie.io/api/v1/players?search=" + searchTerm)
        .then((response) => {
            return response.json();
        })
        .then((resp) => {
            let arr = resp.data; //get nba data array
            showPlayers(arr);
            console.log(resp.data[0]);
        })
        .catch(err => {
            console.log(err);
        });
            
        function showPlayers(arr){
            const results = document.querySelector("#players");
            
            arr.forEach(player => {
                var name = document.createElement('h4'); //create player name h4 element
                name.classList.add('name'); //add class name for styling
                var team = document.createElement('h5'); //same steps for teams 
                team.classList.add('team');

                var playerId = [];
                playerId.push(`${player.id}`);

                name.innerHTML = `${player.first_name} ${player.last_name} - ${player.position}`;
                team.innerHTML = `${player.team.full_name} - ${player.team.abbreviation}`;

                results.appendChild(name);
                results.append(team);
                getStats();


                function getStats(){
                    for(var i = 0; i < playerId.length; i++){
                        fetch("https://www.balldontlie.io/api/v1/season_averages?player_ids[]=" + playerId)
                        .then((response) => {
                            return response.json();
                        })
                        .then((resp) => {
                            let statarr = resp.data;
                            showStats(statarr);
                        })
                        .catch(err => {
                            console.log(err);
                        });
        
                        function showStats(arr) {
                            arr.forEach(stat => {
                                var stats = document.createElement('h4');
                                stats.classList.add('stats');
                                var statsAdv = document.createElement('h5');
                                statsAdv.classList.add('statsAdv');
        
                                stats.innerHTML = `PPG: ${stat.pts} | APG: ${stat.ast} | RPG: ${stat.reb} |  STL: ${stat.stl} | BLK: ${stat.blk}`;
                                statsAdv.innerHTML = `FGA: ${stat.fga} | FGM: ${stat.fgm} | FG%: ${stat.fg_pct} | 3FGA: ${stat.fg3a} | 3FGM: ${stat.fg3m} | 3FG%: ${stat.fg3_pct}`;
        
                                results.append(stats);
                                results.append(statsAdv);
                            })
                        }
                    }


    
                }




            });
        }
    }
}









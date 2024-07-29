let t=gsap.timeline()
let username = document.querySelector("input.username");
let btn_username = document.querySelector("input.button-username");
let invalid_name = document.querySelector("p.invalid_name");
let play_game = document.querySelector("button.play");
let user_guess=document.querySelector("input.user_input");
let submit_guess=document.querySelector("button.submit_guess");
let empty_guess=document.querySelector("p.empty_guess");
let set_user_score=document.querySelector("p.bot_score");
let set_bot_score=document.querySelector("p.user_score");
let winner=document.querySelector("p.winner");
let set_round=document.querySelector("p.round");
let turn=document.querySelector("p.turn");
localStorage.removeItem("name");

t.from('div.user-name-interface',{
    opacity:0,
    x:-20,
    duration:0.7
})

t.from("input.username,input.button-username",{
    opacity:0,
    duration:0.7,
    x:-20,
    stagger:0.2
})





// User Info
btn_username.addEventListener("click", function () {
    let stored_username = username.value;
    localStorage.setItem('name', stored_username.charAt(0).toUpperCase() + stored_username.slice(1).toLowerCase());
    if (stored_username.length >= 1){
        t.to(invalid_name,{
            display:'none'
         });

        t.to("div.user-name-interface",{
            scale:0,
            display:'none'
        })

        t.to("div.accordion",{
            display:"block"
        })
        t.from("button.accordion-button",{
            opacity:0,
            y:-5
        })
        t.from("div.accordion-body ul li",{
            opacity:0,
            x:-20,
            stagger:0.2
        })
        t.to("button.play",{
            display:"block"
        })
    }else{
        t.to(invalid_name,{
            display: 'flex',
            text:'Invalid Name!',
            duration:1
        });
    }

    // Play Game
    play_game.addEventListener("click",()=>{
        t.to("div.accordion",{
            x:20,
            opacity:0,
            display:'none'
        })

        t.to("div.main-box",{
            display:"block",
            opacity:1
        })

        t.from("h1.number-guess,p.bot_score,p.user_score,p.round,input.user_input,button.submit_guess",{
            opacity:0,
            y:10,
            stagger:0.2
        })

        t.to("button.submit_guess",{
            display:"block"
        })

        t.from("p.turn",{
            opacity:0,
            y:10
        })

    })

    // Main Game
    turn.innerText=`Your Chance`;
    let num='';
    // Generate Random Number
    let generateRandomNumber=()=>{
        let number=Math.floor(Math.random()*50)+1;
        num=number
    }
    generateRandomNumber();
  
    let round=1;
    let bot_score=0;
    let user_score=0;
    
    // Round
    let showRound=()=>{
        set_round.innerText=`Round ${round}`
    }
    showRound()
  
    // Update Score
    let updateScore=()=>{
        set_bot_score.innerText=`Alex: ${bot_score}`
        set_user_score.innerText=`${localStorage.getItem('name')}: ${user_score}`
        if(bot_score==user_score){
          set_bot_score.style.color='#633194';
          set_user_score.style.color='#633194';
        }
        else if(bot_score>user_score){
            set_bot_score.style.color='#508D4E';
            set_user_score.style.color='#E4003A';
        }
        else{
            set_user_score.style.color='#508D4E';
            set_bot_score.style.color='#E4003A';
        }
    }
    updateScore()

    // FInal Winner
    let finalWinner=()=>{
        if(user_score>bot_score){
            winner.innerText=`${localStorage.getItem('name')} is the Winner!`;
        }
        else if(user_score<bot_score){
            winner.innerText=`Alex is the Winner!`;
        }
        t.to(winner,{
            display:"block",
            opacity:1,
        })
        const count = 200,
        defaults = {
            origin: { y: 0.7 },
        };
        function fire(particleRatio, opts) {
            confetti(
                Object.assign({}, defaults, opts, {
                particleCount: Math.floor(count * particleRatio),
                })
            );
        }

        fire(0.25, {
        spread: 26,
        startVelocity: 55,
        });

        fire(0.2, {
        spread: 60,
        });

        fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8,
        });

        fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2,
        });

        fire(0.1, {
        spread: 120,
        startVelocity: 45,
        });

        if(user_score==bot_score){
            winner.innerText=`NO Winner!`;
        }
        submit_guess.disabled=true;
        turn.style.display='none';
       
    }
    submit_guess.addEventListener("click",()=>{

        let user_gues_value=user_guess.value;
    
        if(user_gues_value>=1 && user_gues_value<=50){

            t.to("p.empty_guess",{
                display:"none",
                opacity:0
            })

            let bot_guess_value=Math.floor(Math.random()*50)+1;
    
            let count=0;

            // If user guess is correct 
            if(user_gues_value==num){
                turn.innerText=`Your Chance`;
                generateRandomNumber();
                if(round==11){
                    user_score+=20;
                    bot_score-=5;
                }
                else{
                    user_score+=10;
                    bot_score-=5;
                }
                
                winner.innerText=`${localStorage.getItem('name')} Won This Round`;
                t.from(winner,{
                    display:"block",
                    opacity:1,
                    duration:2,
                })
                user_guess.value='';
                updateScore();
                ++round;
                if(round==12){
                    finalWinner()
                }else{
                  showRound();
                }
               
            }
    
            // If user guess is not correct 
            else if(user_gues_value!=num){
             
              let a=setInterval(() => {
                turn.innerText = 'Alex Chance';
                count+=1;
                submit_guess.disabled=true;
                if(count==4){
                    clearTimeout(a);
                    turn.innerText=`Your Chance`;
                    count=0;
                    submit_guess.disabled=false;
                }
              }, 500);

            
              // If bot guess is correct 
              if(bot_guess_value==num){
                generateRandomNumber();
                if(round==11){
                    bot_score+=20;
                    user_score-=5;
                }
                else{
                    bot_score+=10;
                    user_score-=5;
                }
                winner.innerText=`Alex Won This Round`;
                t.from(winner,{
                    display:"block",
                    opacity:1,
                    duration:2,
                })
                user_guess.value='';
                updateScore();
                ++round;
                if(round==12){
                    finalWinner()
                }else{
                  showRound();
                }
              }           
            }       
        }

        else if(user_gues_value.length==0){
            t.to("p.empty_guess",{
                opacity:1,    
                display:"block",
            })
            empty_guess.innerText="Please Provide a Number 🔢";
        }

        else{
          t.to("p.empty_guess",{
            opacity:1,    
            display:"block",
        })
        empty_guess.innerText="Pick a Number from 1 to 50";
        }
        
    })
});

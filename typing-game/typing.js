const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let correct;
let userInput;
let guess;
let lives;

function randRange(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

const DEFAULT_MESSAGE = "Type Here"

class guessingWords {
    constructor(words) {
        this.wordBank = words;
        this.currentWords = [];
        this.currentWordpositions = [];
    }

    shuffle(difficulty) {
        switch(difficulty) {
            
            case 'easy':
                var temp = [];
                for (var i = 0; i < this.wordBank.length; i++) {
                    if (this.wordBank[i].length <= 16) {
                        temp.push(this.wordBank[i])
                    }
                }
                this.wordBank = temp;
                //this.wordBank.sort((a, b) => b.length - a.length);
                break;

            case 'hard':
                var temp = [];
                for (var i = 0; i < this.wordBank.length; i++) {
                    if (this.wordBank[i].length >= 16) {
                        temp.push(this.wordBank[i])
                    }
                }
                this.wordBank = temp;
                //this.wordBank.sort((a, b) => a.length - b.length);
                break;
        }

        for (var i = this.wordBank.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = this.wordBank[i];
            this.wordBank[i] = this.wordBank[j];
            this.wordBank[j] = temp;
        }

    }

    correct(userInput) {
        for (var i = 0; i < this.currentWords.length; i++) {
            if (userInput == this.currentWords[i]) {
                this.currentWordpositions.splice(i, 1)
                this.currentWords.splice(i, 1)
                return true;
            }
        }
    }

    draw() {
        var color = 'black';
        c.beginPath();
        c.font = "30px Calibri";
        c.textAlign = 'center';
        var wordSelected = '';

        for (var i = 0; i < this.currentWords.length; i++) {

            for (var j = 0; j < this.currentWords[i].length; j++) {

                if (userInput[j] == this.currentWords[i][j]) {
                    if (j == 0 && userInput != DEFAULT_MESSAGE && wordSelected == '') {
                        color = 'green';
                        wordSelected = this.currentWords[i];
                    }
                    else if (wordSelected == this.currentWords[i]) {
                        color = 'green';
                    }
                }
                // else if (wordSelected == this.currentWords[i] && userInput[j] != this.currentWords[i][j]) {
                //     color = 'red';
                // }
                else {
                    color = 'black';
                }
                c.fillStyle = color;
                c.fillText(this.currentWords[i][j], this.currentWordpositions[i].x + j*15, this.currentWordpositions[i].y);
            }
            // c.fillText(this.currentWords[i], this.currentWordpositions[i].x, this.currentWordpositions[i].y);
        }

        var stillExists = false;
        for (var i = 0; i < this.currentWords.length; i++) {
            if (wordSelected != '' && this.currentWords[i] == wordSelected) {
                stillExists = true;
            }
        }

        if(!stillExists) {
            userInput = '';
        }
    }

    descend(rate) {
        for (var i = 0; i < this.currentWordpositions.length; i++) {
            //console.log(this.currentWordpositions[i]);
            if (this.currentWordpositions[i].y < canvas.height) {
                this.currentWordpositions[i].y += rate;
            }
            else {
                this.currentWordpositions.splice(i, 1);
                this.currentWords.splice(i, 1);
                lives--;
            }
        }
    }
}

//#region
const academyLower = ["everything everywhere all at once", "all quiet on the western front", "the whale", "top gun: maverick", "black panther: wakanda forever", "avatar: the way of water", "women talking", "guillermo del toro's pinocchio", "navalny", "the elephant whisperers", "an irish goodbye", "the boy, the mole, the fox and the horse", "rrr", "coda", "dune", "the eyes of tammy faye", "no time to die", "the windshield wiper", "the long goodbye", "the queen of basketball", "summer of soul", "drive my car", "encanto", "west side story", "belfast", "the power of the dog", "king richard", "cruella", "nomadland", "the father", "judas and the black messiah", "minari", "mank", "sound of metal", "ma rainey's black bottom", "promising young woman", "tenet", "soul", "another round", "my octopus teacher", "colette", "if anything happens i love you", "two distant strangers", "parasite", "ford v ferrari", "learning to skateboard in a warzone", "the neighbors' window", "little women", "marriage story", "jojo rabbit", "toy story 4", "joker", "once upon a time in hollywood", "1917", "judy", "bombshell", "rocketman", "american factory", "hair love", "green book", "bohemian rhapsody", "roma", "black panther", "the favourite", "a star is born", "vice", "blackkklansman", "first man", "if beale street could talk", "bao", "free solo", "period. end of sentence.", "skin", "spider-man: into the spider-verse", "the shape of water", "dunkirk", "three billboards outside ebbing, missouri", "darkest hour", "blade runner 2049", "coco", "phantom thread", "call me by your name", "get out", "i, tonya", "dear basketball", "a fantastic woman", "heaven is a traffic jam on the 405", "icarus", "the silent child", "flesh and sand", "moonlight", "la la land", "hacksaw ridge", "manchester by the sea", "arrival", "fences", "fantastic beasts and where to find them", "the jungle book", "o.j.: made in america", "piper", "the salesman", "sing", "suicide squad", "the white helmets", "zootopia", "spotlight", "mad max: fury road", "the revenant", "bridge of spies", "the big short", "the danish girl", "room", "the hateful eight", "ex machina", "inside out", "amy", "bear story", "a girl in the river: the price of forgiveness", "son of saul", "spectre", "stutterer", "birdman or", "the grand budapest hotel", "whiplash", "the imitation game", "american sniper", "boyhood", "interstellar", "the theory of everything", "ida", "selma", "citizenfour", "big hero 6", "crisis hotline: veterans press 1", "the phone call", "still alice", "feast", "12 years a slave", "gravity", "dallas buyers club", "frozen", "the great gatsby", "her", "blue jasmine", "mr hublot", "the lady in number 6", "helium", "the great beauty", "20 feet from stardom", "argo", "life of pi", "les miserables", "lincoln", "django unchained", "skyfall", "silver linings playbook", "zero dark thirty", "amour", "anna karenina", "paperman", "brave", "searching for sugar man", "inocente", "curfew", "the artist", "hugo", "the iron lady", "the descendants", "the girl with the dragon tattoo", "midnight in paris", "the help", "a separation", "the fantastic flying books of mr. morris lessmore", "the shore", "undefeated", "the muppets", "saving face", "beginners", "rango", "the king's speech", "inception", "the social network", "the fighter", "toy story 3", "alice in wonderland", "black swan", "in a better world", "the lost thing", "god of love", "the wolfman", "strangers no more", "inside job", "the hurt locker", "avatar", "precious", "up", "crazy heart", "inglourious basterds", "star trek", "the young victoria", "the blind side", "music by prudence", "the secret in their eyes", "the cove", "the new tenants", "logorama", "slumdog millionaire", "the curious case of benjamin button", "milk", "the dark knight", "wall-e", "the reader", "the duchess", "departures", "vicky cristina barcelona", "smile pinki", "man on wire", "toyland", "la maison en petits cubes", "no country for old men", "the bourne ultimatum", "there will be blood", "la vie en rose", "atonement", "michael clayton", "ratatouille", "juno", "sweeney todd: the demon barber of fleet street", "the golden compass", "elizabeth: the golden age", "taxi to the dark side", "peter & the wolf", "once", "le mozart des pickpockets", "the counterfeiters", "freeheld", "the departed", "pan's labyrinth", "dreamgirls", "little miss sunshine", "an inconvenient truth", "babel", "the queen", "letters from iwo jima", "pirates of the caribbean: dead man's chest", "the danish poet", "happy feet", "the last king of scotland", "the lives of others", "marie antoinette", "west bank story", "the blood of yingzhou district", "crash", "brokeback mountain", "memoirs of a geisha", "king kong", "capote", "walk the line", "the constant gardener", "the chronicles of narnia: the lion, the witch and the wardrobe", "hustle & flow", "syriana", "march of the penguins", "six shooter", "the moon and the son: an imagined conversation", "a note of triumph: the golden age of norman corwin", "tsotsi", "wallace & gromit: the curse of the were-rabbit", "million dollar baby", "the aviator", "ray", "the incredibles", "finding neverland", "sideways", "lemony snicket's a series of unfortunate events", "spider-man 2", "eternal sunshine of the spotless mind", "the motorcycle diaries", "the sea inside", "born into brothels", "mighty times: the children's march", "wasp", "ryan", "the lord of the rings: the return of the king", "master and commander: the far side of the world", "mystic river", "cold mountain", "lost in translation", "finding nemo", "the barbarian invasions", "two soldiers", "monster", "harvie krumpet", "chernobyl heart", "the fog of war", "chicago", "the pianist", "the lord of the rings: the two towers", "frida", "the hours", "road to perdition", "adaptation", "talk to her", "this charming man", "spirited away", "nowhere in africa", "the chubbchubbs!", "twin towers", "bowling for columbine", "8 mile", "a beautiful mind", "the lord of the rings: the fellowship of the ring", "moulin rouge!", "black hawk down", "gosford park", "monsters, inc.", "pearl harbor", "iris", "shrek", "training day", "monster's ball", "thoth", "for the birds", "no man's land", "murder on a sunday morning", "the accountant", "gladiator", "crouching tiger, hidden dragon", "traffic", "erin brockovich", "almost famous", "wonder boys", "how the grinch stole christmas", "u-571", "pollock", "father and daughter", "into the arms of strangers: stories of the kindertransport", "quiero ser", "big mama", "american beauty", "the matrix", "the cider house rules", "topsy-turvy", "sleepy hollow", "boys don't cry", "tarzan", "one day in september", "the red violin", "the old man and the sea", "my mother dreams the satan's disciples in new york", "king gimp", "girl, interrupted", "all about my mother", "shakespeare in love", "saving private ryan", "life is beautiful", "elizabeth", "gods and monsters", "the prince of egypt", "affliction", "what dreams may come", "the personals", "the last days", "election night", "bunny", "titanic", "good will hunting", "l.a. confidential", "as good as it gets", "the full monty", "men in black", "visas and virtue", "character", "geri's game", "a story of healing", "the long way home", "the english patient", "fargo", "shine", "evita", "jerry maguire", "independence day", "emma", "sling blade", "the ghost and the darkness", "kolya", "the nutty professor", "quest", "when we were kings", "breathing lessons: the life and work of mark o'brien", "dear diary", "braveheart", "apollo 13", "pocahontas", "the usual suspects", "restoration", "babe", "sense and sensibility", "postino: the postman", "dead man walking", "leaving las vegas", "mighty aphrodite", "anne frank remembered", "a close shave", "lieberman in love", "one survivor remembers", "antonia's line", "toy story", "forrest gump", "the lion king", "speed", "ed wood", "pulp fiction", "bullets over broadway", "the madness of king george", "legends of the fall", "a time for justice", "franz kafka's it's a wonderful life", "maya lin: a strong clear vision", "burnt by the sun", "trevor", "the adventures of priscilla, queen of the desert", "bob's birthday", "blue sky", "schindler's list", "the piano", "jurassic park", "philadelphia", "the fugitive", "the age of innocence", "the wrong trousers", "belle epoque", "i am a promise: the children of stanton elementary school", "mrs. doubtfire", "black rider", "defending our lives", "unforgiven", "howards end", "bram stoker's dracula", "aladdin", "the crying game", "scent of a woman", "a river runs through it", "indochine", "my cousin vinny", "the panama deception", "educating peter", "the last of the mohicans", "death becomes her", "omnibus", "mona lisa descending a staircase", "the silence of the lambs", "terminator 2: judgment day", "bugsy", "jfk", "beauty and the beast", "thelma & louise", "the fisher king", "in the shadow of the stars", "manipulation", "mediterraneo", "session man", "city slickers", "deadly deception: general electric, nuclear weapons and our environment", "dances with wolves", "dick tracy", "ghost", "goodfellas", "the hunt for red october", "reversal of fortune", "cyrano de bergerac", "american dream", "journey of hope", "days of waiting", "creature comforts", "the lunch date", "misery", "total recall", "driving miss daisy", "glory", "born on the fourth of july", "my left foot", "the little mermaid", "dead poets society", "the abyss", "indiana jones and the last crusade", "henry v", "the johnstown flood", "common threads: stories from the quilt", "cinema paradiso", "work experience", "batman", "balance", "rain man", "dangerous liaisons", "who framed roger rabbit", "mississippi burning", "working girl", "the accidental tourist", "a fish called wanda", "pelle the conqueror", "the accused", "the appointments of dennis jennings", "beetlejuice", "bird", "hotel terminus: the life and times of klaus barbie", "the milagro beanfield war", "tin toy", "you don't have to die", "the last emperor", "moonstruck", "the untouchables", "babette's feast", "dirty dancing", "harry and the hendersons", "innerspace", "the man who planted trees", "ray's male heterosexual dance hall", "the ten-year lunch", "wall street", "young at heart", "robocop", "platoon", "a room with a view", "hannah and her sisters", "aliens", "the mission", "children of a lesser god", "the color of money", "top gun", "round midnight", "artie shaw: time is all you've got", "the assault", "down and out in america", "the fly", "a greek tragedy", "precious images", "women - for america, for the world", "out of africa", "witness", "cocoon", "prizzi's honor", "back to the future", "kiss of the spider woman", "ran", "the official story", "the trip to bountiful", "white nights", "anna & bella", "broken rainbow", "mask", "molly's pilgrim", "witness to war: dr. charlie clements", "amadeus", "the killing fields", "a passage to india", "places in the heart", "indiana jones and the temple of doom", "charade", "dangerous moves", "purple rain", "the stone carvers", "the times of harvey milk", "the woman in red", "the river", "terms of endearment", "the right stuff", "fanny & alexander", "tender mercies", "yentl", "flashdance", "boys and girls", "flamenco at 5:15", "he makes me feel like dancin'", "sundae in new york", "the year of living dangerously", "return of the jedi", "gandhi", "e.t.: the extra-terrestrial", "an officer and a gentleman", "tootsie", "victor/victoria", "sophie's choice", "missing", "if you love this planet", "just another missing kid", "a shocking accident", "tango", "to begin again", "quest for fire", "chariots of fire", "raiders of the lost ark", "reds", "on golden pond", "arthur", "an american werewolf in london", "close harmony", "crac", "genocide", "mephisto", "violet", "ordinary people", "tess", "raging bull", "fame", "melvin and howard", "coal miner's daughter", "the empire strikes back", "the dollar bottom", "the fly", "from mao to mozart: isaac stern in china", "karl hess: toward liberty", "moscow does not believe in tears", "kramer vs. kramer", "all that jazz", "apocalypse now", "norma rae", "breaking away", "alien", "being there", "a little romance", "best boy", "board and care", "every child", "paul robeson: tribute to an artist", "the tin drum", "the black stallion", "the deer hunter", "coming home", "midnight express", "heaven can wait", "days of heaven", "california suite", "the buddy holly story", "death on the nile", "the flight of the gossamer condor", "get out your handkerchiefs", "scared straight!", "special delivery", "teenage father", "thank god it's friday", "superman", "annie hall", "star wars", "julia", "close encounters of the third kind", "the goodbye girl", "a little night music", "gravity is my enemy", "i'll find a way", "madame rosa", "the sand castle", "who are the debolts? and where did they get nineteen kids?", "you light up my life", "rocky", "network", "all the president's men", "bound for glory", "a star is born", "fellini's casanova", "the omen", "black and white in color", "harlan county, usa", "in the region of ice", "leisure", "number our days", "king kong", "logan's run", "one flew over the cuckoo's nest", "barry lyndon", "jaws", "dog day afternoon", "nashville", "shampoo", "the sunshine boys", "angel and big joe", "dersu uzala", "the end of the game", "great", "the man who skied down everest", "the hindenburg", "the godfather: part ii", "the towering inferno", "the great gatsby", "chinatown", "murder on the orient express", "earthquake", "alice doesn't live here anymore", "amarcord", "harry and tonto", "closed mondays", "don't", "hearts and minds", "one-eyed men are kings", "the sting", "the exorcist", "the way we were", "cries and whispers", "a touch of class", "day for night", "paper moon", "the paper chase", "save the tiger", "the bolero", "frank film", "the great american cowboy", "princeton: a search for answers", "the godfather", "cabaret", "the poseidon adventure", "travels with my aunt", "butterflies are free", "the candidate", "the discreet charm of the bourgeoisie", "a christmas carol", "limelight", "marjoe", "norman rockwell's world... an american dream", "this tiny world", "the french connection", "fiddler on the roof", "the last picture show", "nicholas and alexandra", "sentinels of silence", "bedknobs and broomsticks", "summer of '42", "the garden of the finzi-continis", "the hospital", "klute", "shaft", "the crunch bird", "the hellstrom chronicle", "patton", "ryan's daughter", "airport", "love story", "m*a*s*h", "tora! tora! tora!", "women in love", "lovers and other strangers", "woodstock", "cromwell", "investigation of a citizen above suspicion", "interviews with my lai veterans", "is it always right to be right?", "let it be", "the resurrection of broncho billy", "midnight cowboy", "butch cassidy and the sundance kid", "hello, dolly!", "z", "anne of the thousand days", "they shoot horses, don't they?", "marooned", "the magic machines", "the prime of miss jean brodie", "true grit", "cactus flower", "czechoslovakia 1968", "it's tough to be a bird", "oliver!", "the lion in winter", "romeo and juliet", "funny girl", "2001: a space odyssey", "bullitt", "the producers", "rosemary's baby", "the subject was roses", "the thomas crown affair", "war and peace", "charly", "journey into self", "robert kennedy remembered", "why man creates", "winnie the pooh and the blustery day", "planet of the apes", "in the heat of the night", "camelot", "bonnie and clyde", "guess who's coming to dinner", "doctor dolittle", "the graduate", "thoroughly modern millie", "cool hand luke", "the dirty dozen", "a place to stand", "the anderson platoon", "the box", "closely watched trains", "the redwoods", "a man for all seasons", "who's afraid of virginia woolf?", "grand prix", "fantastic voyage", "a man and a woman", "born free", "the fortune cookie", "a funny thing happened on the way to the forum", "a herb alpert and the tijuana brass double feature", "the war game", "wild wings", "a year toward tomorrow", "the sound of music", "doctor zhivago", "darling", "ship of fools", "cat ballou", "the great race", "a patch of blue", "a thousand clowns", "the shop on main street", "the sandpiper", "the eleanor roosevelt story", "to be alive!", "7 faces of dr. lao", "7th heaven", "20,000 leagues under the sea", "adventures of don juan", "the adventures of robin hood", "the african queen", "air force", "the alamo", "the alaskan eskimo", "albert schweitzer", "alexander's ragtime band", "all about eve", "all quiet on the western front", "all that money can buy", "all the king's men", "ama girls", "america america", "an american in paris", "amphibious fighters", "anastasia", "anchors aweigh", "anna and the king of siam", "annie get your gun", "anthony adverse", "the apartment", "aquatic house party", "arise, my love", "around the world in 80 days", "the awful truth", "the bachelor and the bobby-soxer", "the bad and the beautiful", "bad girl", "the barefoot contessa", "the battle of midway", "battleground", "bear country", "becket", "the bells of st. mary's", "ben-hur", "benjy", "the bespoke overcoat", "the best years of our lives", "beyond the line of duty", "bicycle thieves", "the big broadcast of 1938", "the big country", "the big house", "bill and coo", "birds anonymous", "the bishop's wife", "black fox: the rise and fall of adolf hitler", "black narcissus", "black orpheus", "the black swan", "blithe spirit", "blood and sand", "blood on the sun", "blossoms in the dust", "body and soul", "bored of education", "born yesterday", "a boy and his dog", "boys town", "the brave one", "breakfast at tiffany's", "breaking the sound barrier", "the bridge of san luis rey", "the bridge on the river kwai", "the bridges at toko-ri", "broadway melody of 1936", "the broadway melody", "broken lance", "busy little bears", "butterfield 8", "calamity jane", "call me madam", "captain carey, u.s.a.", "captains courageous", "casablanca", "casals conducts: 1964", "the cat concerto", "cavalcade", "chagall", "the champ", "champion", "a chance to live", "the charge of the light brigade", "the chicken", "churchill's island", "cimarron", "the circus", "citizen kane", "city of wax", "cleopatra", "cleopatra", "climbing the matterhorn", "come and get it", "come back, little sheba", "coquette", "the country cousin", "the country girl", "cover girl", "the cowboy and the lady", "crash dive", "crashing the water barrier", "the critic", "la cucaracha", "cyrano de bergerac", "a damsel in distress", "dangerous", "the dark angel", "the dawn patrol", "day of the painter", "daybreak in udi", "days of wine and roses", "december 7th", "declaration of independence", "the defiant ones", "der fuehrer's face", "desert victory", "design for death", "designing woman", "destination moon", "the diary of anne frank", "disraeli", "the divine lady", "divorce italian style", "the divorcee", "dodsworth", "the dot and the line", "a double life", "the dove", "dr. jekyll and mr. hyde", "dumbo", "dylan thomas", "east of eden", "easter parade", "elmer gantry", "the enemy below", "eskimo", "exodus", "the face of lincoln", "facing your danger", "the facts of life", "fantasia", "a farewell to arms", "the farmer's daughter", "father goose", "ferdinand the bull", "the fighting lady", "first steps", "flowers and trees", "folies bergere", "for scent-imental reasons", "for whom the bell tolls", "forbidden games", "a force in readiness", "a free soul", "frenchman's creek", "from here to eternity", "the garden of allah", "gaslight", "gate of hell", "the gay divorcee", "gentleman's agreement", "gerald mcboing-boing", "giant", "gigi", "giuseppina", "give me liberty", "glass", "the glenn miller story", "going my way", "gold diggers of 1935", "the golden fish", "goldfinger", "gone with the wind", "the good earth", "goodbye, miss turlock", "goodbye, mr. chips", "grand canyon", "grand hotel", "grandad of races", "the grapes of wrath", "the great caruso", "great expectations", "the great lie", "the great mcginty", "the great waltz", "the great ziegfeld", "the greatest show on earth", "green dolphin street", "the guns of navarone", "hamlet", "happy anniversary", "harvey", "the harvey girls", "heavenly music", "the heiress", "helen keller in her story", "hello, frisco, hello", "henry v", "here comes mr. jordan", "here comes the groom", "the high and the mighty", "high noon", "hitler lives", "a hole in the head", "the hole", "holiday inn", "the horse with the flying tail", "the house i live in", "the house on 92nd street", "how green was my valley", "how the west was won", "how to sleep", "hud", "the human comedy", "the hurricane", "the hustler", "i want to live!", "i wanted wings", "i won't play", "i'll cry tomorrow", "in beaver valley", "in old arizona", "in old chicago", "in which we serve", "the informer", "interrupted melody", "the invaders", "irma la douce", "it happened one night", "it's a mad, mad, mad, mad world", "the jazz singer", "jezebel", "joan of arc", "johann mouse", "johnny belinda", "johnny eager", "the joker is wild", "the jolson story", "judgment at nuremberg", "julius caesar", "kentucky", "key largo", "the king and i", "king of jazz", "king solomon's mines", "kitty foyle", "knighty knight bugs", "kokoda front line!", "kon-tiki", "krakatoa", "kukan", "la strada", "la dolce vita", "lady be good", "the last command", "laura", "the lavender hill mob", "lawrence of arabia", "leave her to heaven", "lend a paw", "les girls", "a letter to three wives", "the life of emile zola", "light in the window", "lili", "lilies of the field", "the little kidnappers", "the little orphan", "little women", "little women", "the lives of a bengal lancer", "the living desert", "the longest day", "lost horizon", "the lost weekend", "love is a many-splendored thing", "love me or leave me", "lust for life", "magoo's puddle jumper", "main street on the march!", "the man who knew too much", "manhattan melodrama", "marie-louise", "marty", "mary poppins", "men against the arctic", "the merry widow", "a midsummer night's dream", "mighty joe young", "mildred pierce", "the milky way", "min and bill", "miracle on 34th street", "the miracle worker", "mister roberts", "monsieur vincent", "moonbird", "the more the merrier", "morning glory", "moscow strikes back", "mother wore tights", "moulin rouge", "mouse trouble", "mr. deeds goes to town", "mr. smith goes to washington", "mrs. miniver", "munro", "the music box", "the music man", "mutiny on the bounty", "my fair lady", "my uncle", "my gal sal", "the naked city", "national velvet", "nature's half acre", "naughty marietta", "neighbours", "neptune's daughter", "never on sunday", "the night of the iguana", "nights of cabiria", "nine from little rock", "none but the lonely heart", "north west mounted police", "now, voyager", "an occurrence at owl creek bridge", "of pups and puzzles", "oklahoma!", "the old man and the sea", "the old mill", "on the town", "on the waterfront", "one hundred men and a girl", "one night of love", "one way passage", "overture to the merry wives of windsor", "the paleface", "panic in the streets", "papa's delicate condition", "the patriot", "penny wisdom", "phantom of the opera", "the philadelphia story", "picnic", "the picture of dorian gray", "pillow talk", "the pink phink", "pinocchio", "a place in the sun", "plymouth adventure", "pollyanna", "porgy and bess", "portrait of jennie", "prelude to war", "pride and prejudice", "the pride of the yankees", "princess o'rourke", "the private life of henry viii", "the private life of the gannets", "project hope", "the public pays", "pygmalion", "quicker'n a wink", "the quiet man", "quiet please!", "the rains came", "rashomon", "the razor's edge", "reap the wild wind", "rebecca", "the red balloon", "the red shoes", "the robe", "robert frost: a lover's quarrel with the world", "roman holiday", "room at the top", "the rose tattoo", "sabrina", "samson and delilah", "samurai i: musashi miyamoto", "san francisco", "sayonara", "the scoundrel", "the sea around us", "seal island", "the search", "seawards the great ships", "the secret land", "seeds of destiny", "separate tables", "serengeti shall not die", "sergeant york", "seven brides for seven brothers", "seven days to noon", "the seventh veil", "shane", "shanghai express", "she wore a yellow ribbon", "shoeshine", "the silent world", "the sin of madelon claudet", "since you went away", "skippy", "sky above and mud beneath", "the snake pit", "snow white and the seven dwarfs", "so much for so little", "so this is harris!", "the solid gold cadillac", "some like it hot", "somebody up there likes me", "the song of bernadette", "song of the south", "song without end", "sons and lovers", "sons of liberty", "south pacific", "spartacus", "spawn of the north", "speaking of animals and their families", "speedy gonzales", "spellbound", "splendor in the grass", "stagecoach", "stairway to light", "stalag 17", "star in the night", "a star is born", "state fair", "the story of louis pasteur", "the stratton story", "street angel", "a streetcar named desire", "strike up the band", "the substitute", "sundays and cybele", "sunrise", "sunset boulevard", "survival city", "suspicion", "sweet bird of youth", "sweethearts", "swing time", "symphony of a city", "tabu", "target for tonight", "teddy, the rough rider", "tempest", "the ten commandments", "that hamilton woman", "that mothers might live", "the thief of bagdad", "the third man", "thirty seconds over tokyo", "this above all", "this is the army", "this land is mine", "this mechanical age", "three coins in the fountain", "the three faces of eve", "three little pigs", "three orphan kittens", "through a glass darkly", "thunderball", "thursday's children", "the time machine", "a time out of war", "tin pan alley", "the titan: story of michelangelo", "titanic", "to catch a thief", "to each his own", "to kill a mockingbird", "tom jones", "tom thumb", "toot, whistle, plunk and boom", "topkapi", "the tortoise and the hare", "torture money", "toward independence", "transatlantic", "the treasure of the sierra madre", "a tree grows in brooklyn", "the true glory", "the true story of the civil war", "tweetie pie", "twelve o'clock high", "two arabian knights", "the two mouseketeers", "two women", "the ugly duckling", "underworld", "the v.i.p.s", "vacation from marriage", "van gogh", "the vanishing prairie", "the virgin spring", "viva villa!", "viva zapata!", "waikiki wedding", "the walls of malapaga", "the war of the worlds", "watch on the rhine", "water birds", "the way of all flesh", "west side story", "the westerner", "the wetback hound", "what ever happened to baby jane?", "when tomorrow comes", "when magoo flew", "when worlds collide", "white shadows in the south seas", "white wilderness", "who's who in animal land", "why korea?", "wilson", "wings", "wings over everest", "with a song in my heart", "with byrd at the south pole", "with the marines at tarawa", "the wizard of oz", "woman of the year", "wonder man", "the wonderful world of the brothers grimm", "world of kids", "world without sun", "wrestling swordfish", "written on the wind", "wuthering heights", "yankee doodle dandy", "the yankee doodle mouse", "the yearling", "yesterday, today and tomorrow", "you can't take it with you", "zorba the greek", ]
//#endregion

//#region
const academyUpper = ["Everything Everywhere All at Once", "All Quiet on the Western Front", "The Whale", "Top Gun: Maverick", "Black Panther: Wakanda Forever", "Avatar: The Way of Water", "Women Talking", "Guillermo del Toro's Pinocchio", "Navalny", "The Elephant Whisperers", "An Irish Goodbye", "The Boy, the Mole, the Fox and the Horse", "RRR", "CODA", "Dune", "The Eyes of Tammy Faye", "No Time to Die", "The Windshield Wiper", "The Long Goodbye", "The Queen of Basketball", "Summer of Soul", "Drive My Car", "Encanto", "West Side Story", "Belfast", "The Power of the Dog", "King Richard", "Cruella", "Nomadland", "The Father", "Judas and the Black Messiah", "Minari", "Mank", "Sound of Metal", "Ma Rainey's Black Bottom", "Promising Young Woman", "Tenet", "Soul", "Another Round", "My Octopus Teacher", "Colette", "If Anything Happens I Love You", "Two Distant Strangers", "Parasite", "Ford v Ferrari", "Learning to Skateboard in a Warzone", "The Neighbors' Window", "Little Women", "Marriage Story", "Jojo Rabbit", "Toy Story 4", "Joker", "Once Upon a Time in Hollywood", "1917", "Judy", "Bombshell", "Rocketman", "American Factory", "Hair Love", "Green Book", "Bohemian Rhapsody", "Roma", "Black Panther", "The Favourite", "A Star Is Born", "Vice", "BlacKkKlansman", "First Man", "If Beale Street Could Talk", "Bao", "Free Solo", "Period. End of Sentence.", "Skin", "Spider-Man: Into the Spider-Verse", "The Shape of Water", "Dunkirk", "Three Billboards Outside Ebbing, Missouri", "Darkest Hour", "Blade Runner 2049", "Coco", "Phantom Thread", "Call Me by Your Name", "Get Out", "I, Tonya", "Dear Basketball", "A Fantastic Woman", "Heaven Is a Traffic Jam on the 405", "Icarus", "The Silent Child", "Flesh and Sand", "Moonlight", "La La Land", "Hacksaw Ridge", "Manchester by the Sea", "Arrival", "Fences", "Fantastic Beasts and Where to Find Them", "The Jungle Book", "O.J.: Made in America", "Piper", "The Salesman", "Sing", "Suicide Squad", "The White Helmets", "Zootopia", "Spotlight", "Mad Max: Fury Road", "The Revenant", "Bridge of Spies", "The Big Short", "The Danish Girl", "Room", "The Hateful Eight", "Ex Machina", "Inside Out", "Amy", "Bear Story", "A Girl in the River: The Price of Forgiveness", "Son of Saul", "Spectre", "Stutterer", "Birdman or", "The Grand Budapest Hotel", "Whiplash", "The Imitation Game", "American Sniper", "Boyhood", "Interstellar", "The Theory of Everything", "Ida", "Selma", "Citizenfour", "Big Hero 6", "Crisis Hotline: Veterans Press 1", "The Phone Call", "Still Alice", "Feast", "12 Years a Slave", "Gravity", "Dallas Buyers Club", "Frozen", "The Great Gatsby", "Her", "Blue Jasmine", "Mr Hublot", "The Lady in Number 6", "Helium", "The Great Beauty", "20 Feet from Stardom", "Argo", "Life of Pi", "Les Miserables", "Lincoln", "Django Unchained", "Skyfall", "Silver Linings Playbook", "Zero Dark Thirty", "Amour", "Anna Karenina", "Paperman", "Brave", "Searching for Sugar Man", "Inocente", "Curfew", "The Artist", "Hugo", "The Iron Lady", "The Descendants", "The Girl with the Dragon Tattoo", "Midnight in Paris", "The Help", "A Separation", "The Fantastic Flying Books of Mr. Morris Lessmore", "The Shore", "Undefeated", "The Muppets", "Saving Face", "Beginners", "Rango", "The King's Speech", "Inception", "The Social Network", "The Fighter", "Toy Story 3", "Alice in Wonderland", "Black Swan", "In a Better World", "The Lost Thing", "God of Love", "The Wolfman", "Strangers No More", "Inside Job", "The Hurt Locker", "Avatar", "Precious", "Up", "Crazy Heart", "Inglourious Basterds", "Star Trek", "The Young Victoria", "The Blind Side", "Music by Prudence", "The Secret in Their Eyes", "The Cove", "The New Tenants", "Logorama", "Slumdog Millionaire", "The Curious Case of Benjamin Button", "Milk", "The Dark Knight", "WALL-E", "The Reader", "The Duchess", "Departures", "Vicky Cristina Barcelona", "Smile Pinki", "Man on Wire", "Toyland", "La Maison en Petits Cubes", "No Country for Old Men", "The Bourne Ultimatum", "There Will Be Blood", "La Vie en rose", "Atonement", "Michael Clayton", "Ratatouille", "Juno", "Sweeney Todd: The Demon Barber of Fleet Street", "The Golden Compass", "Elizabeth: The Golden Age", "Taxi to the Dark Side", "Peter & the Wolf", "Once", "Le Mozart des pickpockets", "The Counterfeiters", "Freeheld", "The Departed", "Pan's Labyrinth", "Dreamgirls", "Little Miss Sunshine", "An Inconvenient Truth", "Babel", "The Queen", "Letters from Iwo Jima", "Pirates of the Caribbean: Dead Man's Chest", "The Danish Poet", "Happy Feet", "The Last King of Scotland", "The Lives of Others", "Marie Antoinette", "West Bank Story", "The Blood of Yingzhou District", "Crash", "Brokeback Mountain", "Memoirs of a Geisha", "King Kong", "Capote", "Walk the Line", "The Constant Gardener", "The Chronicles of Narnia: The Lion, the Witch and the Wardrobe", "Hustle & Flow", "Syriana", "March of the Penguins", "Six Shooter", "The Moon and the Son: An Imagined Conversation", "A Note of Triumph: The Golden Age of Norman Corwin", "Tsotsi", "Wallace & Gromit: The Curse of the Were-Rabbit", "Million Dollar Baby", "The Aviator", "Ray", "The Incredibles", "Finding Neverland", "Sideways", "Lemony Snicket's A Series of Unfortunate Events", "Spider-Man 2", "Eternal Sunshine of the Spotless Mind", "The Motorcycle Diaries", "The Sea Inside", "Born into Brothels", "Mighty Times: The Children's March", "Wasp", "Ryan", "The Lord of the Rings: The Return of the King", "Master and Commander: The Far Side of the World", "Mystic River", "Cold Mountain", "Lost in Translation", "Finding Nemo", "The Barbarian Invasions", "Two Soldiers", "Monster", "Harvie Krumpet", "Chernobyl Heart", "The Fog of War", "Chicago", "The Pianist", "The Lord of the Rings: The Two Towers", "Frida", "The Hours", "Road to Perdition", "Adaptation", "Talk to Her", "This Charming Man", "Spirited Away", "Nowhere in Africa", "The ChubbChubbs!", "Twin Towers", "Bowling for Columbine", "8 Mile", "A Beautiful Mind", "The Lord of the Rings: The Fellowship of the Ring", "Moulin Rouge!", "Black Hawk Down", "Gosford Park", "Monsters, Inc.", "Pearl Harbor", "Iris", "Shrek", "Training Day", "Monster's Ball", "Thoth", "For the Birds", "No Man's Land", "Murder on a Sunday Morning", "The Accountant", "Gladiator", "Crouching Tiger, Hidden Dragon", "Traffic", "Erin Brockovich", "Almost Famous", "Wonder Boys", "How the Grinch Stole Christmas", "U-571", "Pollock", "Father and Daughter", "Into the Arms of Strangers: Stories of the Kindertransport", "Quiero ser", "Big Mama", "American Beauty", "The Matrix", "The Cider House Rules", "Topsy-Turvy", "Sleepy Hollow", "Boys Don't Cry", "Tarzan", "One Day in September", "The Red Violin", "The Old Man and the Sea", "My Mother Dreams the Satan's Disciples in New York", "King Gimp", "Girl, Interrupted", "All About My Mother", "Shakespeare in Love", "Saving Private Ryan", "Life Is Beautiful", "Elizabeth", "Gods and Monsters", "The Prince of Egypt", "Affliction", "What Dreams May Come", "The Personals", "The Last Days", "Election Night", "Bunny", "Titanic", "Good Will Hunting", "L.A. Confidential", "As Good as It Gets", "The Full Monty", "Men in Black", "Visas and Virtue", "Character", "Geri's Game", "A Story of Healing", "The Long Way Home", "The English Patient", "Fargo", "Shine", "Evita", "Jerry Maguire", "Independence Day", "Emma", "Sling Blade", "The Ghost and the Darkness", "Kolya", "The Nutty Professor", "Quest", "When We Were Kings", "Breathing Lessons: The Life and Work of Mark O'Brien", "Dear Diary", "Braveheart", "Apollo 13", "Pocahontas", "The Usual Suspects", "Restoration", "Babe", "Sense and Sensibility", "Postino: The Postman", "Dead Man Walking", "Leaving Las Vegas", "Mighty Aphrodite", "Anne Frank Remembered", "A Close Shave", "Lieberman in Love", "One Survivor Remembers", "Antonia's Line", "Toy Story", "Forrest Gump", "The Lion King", "Speed", "Ed Wood", "Pulp Fiction", "Bullets Over Broadway", "The Madness of King George", "Legends of the Fall", "A Time for Justice", "Franz Kafka's It's a Wonderful Life", "Maya Lin: A Strong Clear Vision", "Burnt by the Sun", "Trevor", "The Adventures of Priscilla, Queen of the Desert", "Bob's Birthday", "Blue Sky", "Schindler's List", "The Piano", "Jurassic Park", "Philadelphia", "The Fugitive", "The Age of Innocence", "The Wrong Trousers", "Belle Epoque", "I Am a Promise: The Children of Stanton Elementary School", "Mrs. Doubtfire", "Black Rider", "Defending Our Lives", "Unforgiven", "Howards End", "Bram Stoker's Dracula", "Aladdin", "The Crying Game", "Scent of a Woman", "A River Runs Through It", "Indochine", "My Cousin Vinny", "The Panama Deception", "Educating Peter", "The Last of the Mohicans", "Death Becomes Her", "Omnibus", "Mona Lisa Descending a Staircase", "The Silence of the Lambs", "Terminator 2: Judgment Day", "Bugsy", "JFK", "Beauty and the Beast", "Thelma & Louise", "The Fisher King", "In the Shadow of the Stars", "Manipulation", "Mediterraneo", "Session Man", "City Slickers", "Deadly Deception: General Electric, Nuclear Weapons and Our Environment", "Dances with Wolves", "Dick Tracy", "Ghost", "Goodfellas", "The Hunt for Red October", "Reversal of Fortune", "Cyrano de Bergerac", "American Dream", "Journey of Hope", "Days of Waiting", "Creature Comforts", "The Lunch Date", "Misery", "Total Recall", "Driving Miss Daisy", "Glory", "Born on the Fourth of July", "My Left Foot", "The Little Mermaid", "Dead Poets Society", "The Abyss", "Indiana Jones and the Last Crusade", "Henry V", "The Johnstown Flood", "Common Threads: Stories from the Quilt", "Cinema Paradiso", "Work Experience", "Batman", "Balance", "Rain Man", "Dangerous Liaisons", "Who Framed Roger Rabbit", "Mississippi Burning", "Working Girl", "The Accidental Tourist", "A Fish Called Wanda", "Pelle the Conqueror", "The Accused", "The Appointments of Dennis Jennings", "Beetlejuice", "Bird", "Hotel Terminus: The Life and Times of Klaus Barbie", "The Milagro Beanfield War", "Tin Toy", "You Don't Have to Die", "The Last Emperor", "Moonstruck", "The Untouchables", "Babette's Feast", "Dirty Dancing", "Harry and the Hendersons", "Innerspace", "The Man Who Planted Trees", "Ray's Male Heterosexual Dance Hall", "The Ten-Year Lunch", "Wall Street", "Young at Heart", "RoboCop", "Platoon", "A Room with a View", "Hannah and Her Sisters", "Aliens", "The Mission", "Children of a Lesser God", "The Color of Money", "Top Gun", "Round Midnight", "Artie Shaw: Time Is All You've Got", "The Assault", "Down and Out in America", "The Fly", "A Greek Tragedy", "Precious Images", "Women - for America, for the World", "Out of Africa", "Witness", "Cocoon", "Prizzi's Honor", "Back to the Future", "Kiss of the Spider Woman", "Ran", "The Official Story", "The Trip to Bountiful", "White Nights", "Anna & Bella", "Broken Rainbow", "Mask", "Molly's Pilgrim", "Witness to War: Dr. Charlie Clements", "Amadeus", "The Killing Fields", "A Passage to India", "Places in the Heart", "Indiana Jones and the Temple of Doom", "Charade", "Dangerous Moves", "Purple Rain", "The Stone Carvers", "The Times of Harvey Milk", "The Woman in Red", "The River", "Terms of Endearment", "The Right Stuff", "Fanny & Alexander", "Tender Mercies", "Yentl", "Flashdance", "Boys and Girls", "Flamenco at 5:15", "He Makes Me Feel Like Dancin'", "Sundae in New York", "The Year of Living Dangerously", "Return of the Jedi", "Gandhi", "E.T.: The Extra-Terrestrial", "An Officer and a Gentleman", "Tootsie", "Victor/Victoria", "Sophie's Choice", "Missing", "If You Love This Planet", "Just Another Missing Kid", "A Shocking Accident", "Tango", "To Begin Again", "Quest for Fire", "Chariots of Fire", "Raiders of the Lost Ark", "Reds", "On Golden Pond", "Arthur", "An American Werewolf in London", "Close Harmony", "Crac", "Genocide", "Mephisto", "Violet", "Ordinary People", "Tess", "Raging Bull", "Fame", "Melvin and Howard", "Coal Miner's Daughter", "The Empire Strikes Back", "The Dollar Bottom", "The Fly", "From Mao to Mozart: Isaac Stern in China", "Karl Hess: Toward Liberty", "Moscow Does Not Believe in Tears", "Kramer vs. Kramer", "All That Jazz", "Apocalypse Now", "Norma Rae", "Breaking Away", "Alien", "Being There", "A Little Romance", "Best Boy", "Board and Care", "Every Child", "Paul Robeson: Tribute to an Artist", "The Tin Drum", "The Black Stallion", "The Deer Hunter", "Coming Home", "Midnight Express", "Heaven Can Wait", "Days of Heaven", "California Suite", "The Buddy Holly Story", "Death on the Nile", "The Flight of the Gossamer Condor", "Get Out Your Handkerchiefs", "Scared Straight!", "Special Delivery", "Teenage Father", "Thank God It's Friday", "Superman", "Annie Hall", "Star Wars", "Julia", "Close Encounters of the Third Kind", "The Goodbye Girl", "A Little Night Music", "Gravity Is My Enemy", "I'll Find a Way", "Madame Rosa", "The Sand Castle", "Who Are the DeBolts? And Where Did They Get Nineteen Kids?", "You Light Up My Life", "Rocky", "Network", "All the President's Men", "Bound for Glory", "A Star Is Born", "Fellini's Casanova", "The Omen", "Black and White in Color", "Harlan County, USA", "In the Region of Ice", "Leisure", "Number Our Days", "King Kong", "Logan's Run", "One Flew Over the Cuckoo's Nest", "Barry Lyndon", "Jaws", "Dog Day Afternoon", "Nashville", "Shampoo", "The Sunshine Boys", "Angel and Big Joe", "Dersu Uzala", "The End of the Game", "Great", "The Man Who Skied Down Everest", "The Hindenburg", "The Godfather: Part II", "The Towering Inferno", "The Great Gatsby", "Chinatown", "Murder on the Orient Express", "Earthquake", "Alice Doesn't Live Here Anymore", "Amarcord", "Harry and Tonto", "Closed Mondays", "Don't", "Hearts and Minds", "One-Eyed Men Are Kings", "The Sting", "The Exorcist", "The Way We Were", "Cries and Whispers", "A Touch of Class", "Day for Night", "Paper Moon", "The Paper Chase", "Save the Tiger", "The Bolero", "Frank Film", "The Great American Cowboy", "Princeton: A Search for Answers", "The Godfather", "Cabaret", "The Poseidon Adventure", "Travels with My Aunt", "Butterflies Are Free", "The Candidate", "The Discreet Charm of the Bourgeoisie", "A Christmas Carol", "Limelight", "Marjoe", "Norman Rockwell's World... An American Dream", "This Tiny World", "The French Connection", "Fiddler on the Roof", "The Last Picture Show", "Nicholas and Alexandra", "Sentinels of Silence", "Bedknobs and Broomsticks", "Summer of '42", "The Garden of the Finzi-Continis", "The Hospital", "Klute", "Shaft", "The Crunch Bird", "The Hellstrom Chronicle", "Patton", "Ryan's Daughter", "Airport", "Love Story", "M*A*S*H", "Tora! Tora! Tora!", "Women in Love", "Lovers and Other Strangers", "Woodstock", "Cromwell", "Investigation of a Citizen Above Suspicion", "Interviews with My Lai Veterans", "Is It Always Right to Be Right?", "Let It Be", "The Resurrection of Broncho Billy", "Midnight Cowboy", "Butch Cassidy and the Sundance Kid", "Hello, Dolly!", "Z", "Anne of the Thousand Days", "They Shoot Horses, Don't They?", "Marooned", "The Magic Machines", "The Prime of Miss Jean Brodie", "True Grit", "Cactus Flower", "Czechoslovakia 1968", "It's Tough to Be a Bird", "Oliver!", "The Lion in Winter", "Romeo and Juliet", "Funny Girl", "2001: A Space Odyssey", "Bullitt", "The Producers", "Rosemary's Baby", "The Subject Was Roses", "The Thomas Crown Affair", "War and Peace", "Charly", "Journey into Self", "Robert Kennedy Remembered", "Why Man Creates", "Winnie the Pooh and the Blustery Day", "Planet of the Apes", "In the Heat of the Night", "Camelot", "Bonnie and Clyde", "Guess Who's Coming to Dinner", "Doctor Dolittle", "The Graduate", "Thoroughly Modern Millie", "Cool Hand Luke", "The Dirty Dozen", "A Place to Stand", "The Anderson Platoon", "The Box", "Closely Watched Trains", "The Redwoods", "A Man for All Seasons", "Who's Afraid of Virginia Woolf?", "Grand Prix", "Fantastic Voyage", "A Man and a Woman", "Born Free", "The Fortune Cookie", "A Funny Thing Happened on the Way to the Forum", "A Herb Alpert and the Tijuana Brass Double Feature", "The War Game", "Wild Wings", "A Year Toward Tomorrow", "The Sound of Music", "Doctor Zhivago", "Darling", "Ship of Fools", "Cat Ballou", "The Great Race", "A Patch of Blue", "A Thousand Clowns", "The Shop on Main Street", "The Sandpiper", "The Eleanor Roosevelt Story", "To Be Alive!", "7 Faces of Dr. Lao", "7th Heaven", "20,000 Leagues Under the Sea", "Adventures of Don Juan", "The Adventures of Robin Hood", "The African Queen", "Air Force", "The Alamo", "The Alaskan Eskimo", "Albert Schweitzer", "Alexander's Ragtime Band", "All About Eve", "All Quiet on the Western Front", "All That Money Can Buy", "All the King's Men", "Ama Girls", "America America", "An American in Paris", "Amphibious Fighters", "Anastasia", "Anchors Aweigh", "Anna and the King of Siam", "Annie Get Your Gun", "Anthony Adverse", "The Apartment", "Aquatic House Party", "Arise, My Love", "Around the World in 80 Days", "The Awful Truth", "The Bachelor and the Bobby-Soxer", "The Bad and the Beautiful", "Bad Girl", "The Barefoot Contessa", "The Battle of Midway", "Battleground", "Bear Country", "Becket", "The Bells of St. Mary's", "Ben-Hur", "Benjy", "The Bespoke Overcoat", "The Best Years of Our Lives", "Beyond the Line of Duty", "Bicycle Thieves", "The Big Broadcast of 1938", "The Big Country", "The Big House", "Bill and Coo", "Birds Anonymous", "The Bishop's Wife", "Black Fox: The Rise and Fall of Adolf Hitler", "Black Narcissus", "Black Orpheus", "The Black Swan", "Blithe Spirit", "Blood and Sand", "Blood on the Sun", "Blossoms in the Dust", "Body and Soul", "Bored of Education", "Born Yesterday", "A Boy and His Dog", "Boys Town", "The Brave One", "Breakfast at Tiffany's", "Breaking the Sound Barrier", "The Bridge of San Luis Rey", "The Bridge on the River Kwai", "The Bridges at Toko-Ri", "Broadway Melody of 1936", "The Broadway Melody", "Broken Lance", "Busy Little Bears", "BUtterfield 8", "Calamity Jane", "Call Me Madam", "Captain Carey, U.S.A.", "Captains Courageous", "Casablanca", "Casals Conducts: 1964", "The Cat Concerto", "Cavalcade", "Chagall", "The Champ", "Champion", "A Chance to Live", "The Charge of the Light Brigade", "The Chicken", "Churchill's Island", "Cimarron", "The Circus", "Citizen Kane", "City of Wax", "Cleopatra", "Cleopatra", "Climbing the Matterhorn", "Come and Get It", "Come Back, Little Sheba", "Coquette", "The Country Cousin", "The Country Girl", "Cover Girl", "The Cowboy and the Lady", "Crash Dive", "Crashing the Water Barrier", "The Critic", "La Cucaracha", "Cyrano de Bergerac", "A Damsel in Distress", "Dangerous", "The Dark Angel", "The Dawn Patrol", "Day of the Painter", "Daybreak in Udi", "Days of Wine and Roses", "December 7th", "Declaration of Independence", "The Defiant Ones", "Der Fuehrer's Face", "Desert Victory", "Design for Death", "Designing Woman", "Destination Moon", "The Diary of Anne Frank", "Disraeli", "The Divine Lady", "Divorce Italian Style", "The Divorcee", "Dodsworth", "The Dot and the Line", "A Double Life", "The Dove", "Dr. Jekyll and Mr. Hyde", "Dumbo", "Dylan Thomas", "East of Eden", "Easter Parade", "Elmer Gantry", "The Enemy Below", "Eskimo", "Exodus", "The Face of Lincoln", "Facing Your Danger", "The Facts of Life", "Fantasia", "A Farewell to Arms", "The Farmer's Daughter", "Father Goose", "Ferdinand the Bull", "The Fighting Lady", "First Steps", "Flowers and Trees", "Folies Bergere", "For Scent-imental Reasons", "For Whom the Bell Tolls", "Forbidden Games", "A Force in Readiness", "A Free Soul", "Frenchman's Creek", "From Here to Eternity", "The Garden of Allah", "Gaslight", "Gate of Hell", "The Gay Divorcee", "Gentleman's Agreement", "Gerald McBoing-Boing", "Giant", "Gigi", "Giuseppina", "Give Me Liberty", "Glass", "The Glenn Miller Story", "Going My Way", "Gold Diggers of 1935", "The Golden Fish", "Goldfinger", "Gone with the Wind", "The Good Earth", "Goodbye, Miss Turlock", "Goodbye, Mr. Chips", "Grand Canyon", "Grand Hotel", "Grandad of Races", "The Grapes of Wrath", "The Great Caruso", "Great Expectations", "The Great Lie", "The Great McGinty", "The Great Waltz", "The Great Ziegfeld", "The Greatest Show on Earth", "Green Dolphin Street", "The Guns of Navarone", "Hamlet", "Happy Anniversary", "Harvey", "The Harvey Girls", "Heavenly Music", "The Heiress", "Helen Keller in Her Story", "Hello, Frisco, Hello", "Henry V", "Here Comes Mr. Jordan", "Here Comes the Groom", "The High and the Mighty", "High Noon", "Hitler Lives", "A Hole in the Head", "The Hole", "Holiday Inn", "The Horse with the Flying Tail", "The House I Live In", "The House on 92nd Street", "How Green Was My Valley", "How the West Was Won", "How to Sleep", "Hud", "The Human Comedy", "The Hurricane", "The Hustler", "I Want to Live!", "I Wanted Wings", "I Won't Play", "I'll Cry Tomorrow", "In Beaver Valley", "In Old Arizona", "In Old Chicago", "In Which We Serve", "The Informer", "Interrupted Melody", "The Invaders", "Irma la Douce", "It Happened One Night", "It's a Mad, Mad, Mad, Mad World", "The Jazz Singer", "Jezebel", "Joan of Arc", "Johann Mouse", "Johnny Belinda", "Johnny Eager", "The Joker Is Wild", "The Jolson Story", "Judgment at Nuremberg", "Julius Caesar", "Kentucky", "Key Largo", "The King and I", "King of Jazz", "King Solomon's Mines", "Kitty Foyle", "Knighty Knight Bugs", "Kokoda Front Line!", "Kon-Tiki", "Krakatoa", "Kukan", "La Strada", "La Dolce Vita", "Lady Be Good", "The Last Command", "Laura", "The Lavender Hill Mob", "Lawrence of Arabia", "Leave Her to Heaven", "Lend a Paw", "Les Girls", "A Letter to Three Wives", "The Life of Emile Zola", "Light in the Window", "Lili", "Lilies of the Field", "The Little Kidnappers", "The Little Orphan", "Little Women", "Little Women", "The Lives of a Bengal Lancer", "The Living Desert", "The Longest Day", "Lost Horizon", "The Lost Weekend", "Love Is a Many-Splendored Thing", "Love Me or Leave Me", "Lust for Life", "Magoo's Puddle Jumper", "Main Street on the March!", "The Man Who Knew Too Much", "Manhattan Melodrama", "Marie-Louise", "Marty", "Mary Poppins", "Men Against the Arctic", "The Merry Widow", "A Midsummer Night's Dream", "Mighty Joe Young", "Mildred Pierce", "The Milky Way", "Min and Bill", "Miracle on 34th Street", "The Miracle Worker", "Mister Roberts", "Monsieur Vincent", "Moonbird", "The More the Merrier", "Morning Glory", "Moscow Strikes Back", "Mother Wore Tights", "Moulin Rouge", "Mouse Trouble", "Mr. Deeds Goes to Town", "Mr. Smith Goes to Washington", "Mrs. Miniver", "Munro", "The Music Box", "The Music Man", "Mutiny on the Bounty", "My Fair Lady", "My Uncle", "My Gal Sal", "The Naked City", "National Velvet", "Nature's Half Acre", "Naughty Marietta", "Neighbours", "Neptune's Daughter", "Never on Sunday", "The Night of the Iguana", "Nights of Cabiria", "Nine from Little Rock", "None But the Lonely Heart", "North West Mounted Police", "Now, Voyager", "An Occurrence at Owl Creek Bridge", "Of Pups and Puzzles", "Oklahoma!", "The Old Man and the Sea", "The Old Mill", "On the Town", "On the Waterfront", "One Hundred Men and a Girl", "One Night of Love", "One Way Passage", "Overture to The Merry Wives of Windsor", "The Paleface", "Panic in the Streets", "Papa's Delicate Condition", "The Patriot", "Penny Wisdom", "Phantom of the Opera", "The Philadelphia Story", "Picnic", "The Picture of Dorian Gray", "Pillow Talk", "The Pink Phink", "Pinocchio", "A Place in the Sun", "Plymouth Adventure", "Pollyanna", "Porgy and Bess", "Portrait of Jennie", "Prelude to War", "Pride and Prejudice", "The Pride of the Yankees", "Princess O'Rourke", "The Private Life of Henry VIII", "The Private Life of the Gannets", "Project Hope", "The Public Pays", "Pygmalion", "Quicker'n a Wink", "The Quiet Man", "Quiet Please!", "The Rains Came", "Rashomon", "The Razor's Edge", "Reap the Wild Wind", "Rebecca", "The Red Balloon", "The Red Shoes", "The Robe", "Robert Frost: A Lover's Quarrel with the World", "Roman Holiday", "Room at the Top", "The Rose Tattoo", "Sabrina", "Samson and Delilah", "Samurai I: Musashi Miyamoto", "San Francisco", "Sayonara", "The Scoundrel", "The Sea Around Us", "Seal Island", "The Search", "Seawards the Great Ships", "The Secret Land", "Seeds of Destiny", "Separate Tables", "Serengeti Shall Not Die", "Sergeant York", "Seven Brides for Seven Brothers", "Seven Days to Noon", "The Seventh Veil", "Shane", "Shanghai Express", "She Wore a Yellow Ribbon", "Shoeshine", "The Silent World", "The Sin of Madelon Claudet", "Since You Went Away", "Skippy", "Sky Above and Mud Beneath", "The Snake Pit", "Snow White and the Seven Dwarfs", "So Much for So Little", "So This Is Harris!", "The Solid Gold Cadillac", "Some Like It Hot", "Somebody Up There Likes Me", "The Song of Bernadette", "Song of the South", "Song Without End", "Sons and Lovers", "Sons of Liberty", "South Pacific", "Spartacus", "Spawn of the North", "Speaking of Animals and Their Families", "Speedy Gonzales", "Spellbound", "Splendor in the Grass", "Stagecoach", "Stairway to Light", "Stalag 17", "Star in the Night", "A Star Is Born", "State Fair", "The Story of Louis Pasteur", "The Stratton Story", "Street Angel", "A Streetcar Named Desire", "Strike Up the Band", "The Substitute", "Sundays and Cybele", "Sunrise", "Sunset Boulevard", "Survival City", "Suspicion", "Sweet Bird of Youth", "Sweethearts", "Swing Time", "Symphony of a City", "Tabu", "Target for Tonight", "Teddy, the Rough Rider", "Tempest", "The Ten Commandments", "That Hamilton Woman", "That Mothers Might Live", "The Thief of Bagdad", "The Third Man", "Thirty Seconds Over Tokyo", "This Above All", "This Is the Army", "This Land Is Mine", "This Mechanical Age", "Three Coins in the Fountain", "The Three Faces of Eve", "Three Little Pigs", "Three Orphan Kittens", "Through a Glass Darkly", "Thunderball", "Thursday's Children", "The Time Machine", "A Time Out of War", "Tin Pan Alley", "The Titan: Story of Michelangelo", "Titanic", "To Catch a Thief", "To Each His Own", "To Kill a Mockingbird", "Tom Jones", "tom thumb", "Toot, Whistle, Plunk and Boom", "Topkapi", "The Tortoise and the Hare", "Torture Money", "Toward Independence", "Transatlantic", "The Treasure of the Sierra Madre", "A Tree Grows in Brooklyn", "The True Glory", "The True Story of the Civil War", "Tweetie Pie", "Twelve O'Clock High", "Two Arabian Knights", "The Two Mouseketeers", "Two Women", "The Ugly Duckling", "Underworld", "The V.I.P.s", "Vacation from Marriage", "Van Gogh", "The Vanishing Prairie", "The Virgin Spring", "Viva Villa!", "Viva Zapata!", "Waikiki Wedding", "The Walls of Malapaga", "The War of the Worlds", "Watch on the Rhine", "Water Birds", "The Way of All Flesh", "West Side Story", "The Westerner", "The Wetback Hound", "What Ever Happened to Baby Jane?", "When Tomorrow Comes", "When Magoo Flew", "When Worlds Collide", "White Shadows in the South Seas", "White Wilderness", "Who's Who in Animal Land", "Why Korea?", "Wilson", "Wings", "Wings Over Everest", "With a Song in My Heart", "With Byrd at the South Pole", "With the Marines at Tarawa", "The Wizard of Oz", "Woman of the Year", "Wonder Man", "The Wonderful World of the Brothers Grimm", "World of Kids", "World Without Sun", "Wrestling Swordfish", "Written on the Wind", "Wuthering Heights", "Yankee Doodle Dandy", "The Yankee Doodle Mouse", "The Yearling", "Yesterday, Today and Tomorrow", "You Can't Take It with You", "Zorba the Greek", ]
//#endregion

//#region
//#endregion

// avg word length is 16, can be used for difficulty purposes
function init() {
    correct = 0;
    lives = 3;
    userInput = DEFAULT_MESSAGE;
    //guess = new guessingWords(['blind', 'world','hive', 'The Patriot', 'Titanic']) //debugging
    guess = new guessingWords(academyLower);
    guess.shuffle();
}


window.addEventListener('keydown', (event) => {
    if (userInput == DEFAULT_MESSAGE) {
        userInput = '';
    }
    var addKey = ''

    switch(event.key) {
        case 'Q':
            addKey = 'Q';
            break;
        case 'W':
            addKey = 'W';
            break;
        case 'E':
            addKey = 'E';
            break;
        case 'R':
            addKey = 'R';
            break;
        case 'T':
            addKey = 'T';
            break;
        case 'Y':
            addKey = 'Y';
            break;
        case 'U':
            addKey = 'U';
            break;
        case 'I':
            addKey = 'I';
            break;
        case 'O':
            addKey = 'O';
            break;
        case 'P':
            addKey = 'P';
            break;

        case 'A':
            addKey = 'A';
            break;
        case 'S':
            addKey = 'S';
            break;
        case 'D':
            addKey = 'D';
            break;
        case 'F':
            addKey = 'F';
            break;
        case 'G':
            addKey = 'G';
            break;
        case 'H':
            addKey = 'H';
            break;
        case 'J':
            addKey = 'J';
            break;
        case 'K':
            addKey = 'K';
            break;
        case 'L':
            addKey = 'L';
            break;
        case "'":
            addKey = "'";
            break;

        case 'Z':
            addKey = 'Z';
            break;
        case 'X':
            addKey = 'X';
            break;
        case 'C':
            addKey = 'C';
            break;
        case 'V':
            addKey = 'V';
            break;
        case 'B':
            addKey = 'B';
            break;
        case 'N':
            addKey = 'N';
            break;
        case 'M':
            addKey = 'M';
            break;


        case 'q':
            addKey = 'q';
            break;
        case 'w':
            addKey = 'w';
            break;
        case 'e':
            addKey = 'e';
            break;
        case 'r':
            addKey = 'r';
            break;
        case 't':
            addKey = 't';
            break;
        case 'y':
            addKey = 'y';
            break;
        case 'u':
            addKey = 'u';
            break;
        case 'i':
            addKey = 'i';
            break;
        case 'o':
            addKey = 'o';
            break;
        case 'p':
            addKey = 'p';
            break;

        case 'a':
            addKey = 'a';
            break;
        case 's':
            addKey = 's';
            break;
        case 'd':
            addKey = 'd';
            break;
        case 'f':
            addKey = 'f';
            break;
        case 'g':
            addKey = 'g';
            break;
        case 'h':
            addKey = 'h';
            break;
        case 'j':
            addKey = 'j';
            break;
        case 'k':
            addKey = 'k';
            break;
        case 'l':
            addKey = 'l';
            break;
        case "'":
            addKey = "'";
            break;

        case 'z':
            addKey = 'z';
            break;
        case 'x':
            addKey = 'x';
            break;
        case 'c':
            addKey = 'c';
            break;
        case 'v':
            addKey = 'v';
            break;
        case 'b':
            addKey = 'b';
            break;
        case 'n':
            addKey = 'n';
            break;
        case 'm':
            addKey = 'm';
            break;
			
        case '0':
            addKey = '0';
            break;
        case '1':
            addKey = '1';
            break;
        case '2':
            addKey = '2';
            break;
        case '3':
            addKey = '3';
            break;
        case '4':
            addKey = '4';
            break;
        case '5':
            addKey = '5';
            break;
        case '6':
            addKey = '6';
            break;
        case '7':
            addKey = '7';
            break;
        case '8':
            addKey = '8';
            break;
        case '9':
            addKey = '9';
            break;

        case ' ':
            addKey = ' ';
            break;
        case ',':
            addKey = ',';
            break;
        case '.':
            addKey = '.';
            break;
        case '?':
            addKey = '?';
            break;
        case ';':
            addKey = ';';
            break;
        case ':':
            addKey = ':';
            break;
        case '-':
            addKey = '-';
            break;
        case '/':
            addKey = '/';
            break;
        case '!':
            addKey = '!'
            break;
        case '&':
            addKey = '&';
            break;
        case 'Backspace':
            userInput = userInput.slice(0, userInput.length-1);
    }
    userInput += addKey;
    if (userInput == ' ') {
        userInput = '';
    }
})


function updateWords() {
    setInterval(() => {
        var limit = 200;
        if (guess.wordBank.length) {
            var wordFound = false; 

            for (var i = 0; i < guess.wordBank.length && guess.currentWords.length <= 25 && !wordFound; i++) {
                var fail = false;

                for (var j = 0; j < guess.currentWords.length; j++) {
                    if (guess.wordBank[i][0] == guess.currentWords[j][0]) {
                        fail = true;
                        break;
                    }
                }

                if (!fail) {
                    wordFound = true;
                    console.log('pushed')
                    guess.currentWords.push(guess.wordBank[i])
                    guess.wordBank.splice(i,1);
                }

            }

            if (!guess.currentWords.length) {
                guess.currentWords.push(guess.wordBank[0]);
                guess.wordBank.splice(0,1);
            }

            // this.currentWords.splice(i, 1)
            // guess.currentWords.push(guess.wordBank.pop());
            //console.log(guess.currentWords[guess.currentWords.length-1])
            var wordLength = guess.currentWords[guess.currentWords.length-1].length;
            if (wordLength > 60) {
                limit = 1000;
            }
             if (wordLength > 40) {
                limit = 900;
            }
            else if (wordLength > 20) {
                limit = 600;
            }
            else if (wordLength > 10) {
                limit = 300;
            }
            
            guess.currentWordpositions.push({x: randRange(25, canvas.width - limit), y: 0});
            //console.log(guess.currentWords.length, guess.currentWordpositions.length);
        }

    },1000 * 3)
}


// c.font = "30px Calibri";
// c.fillStyle = 'red';
// c.textAlign = 'center';
// c.fillText('Deadly Deception: General Electric, Nuclear Weapons and Our Environment', canvas.width - 500, canvas.height/2 + 200);

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.rect(0, 0, canvas.width, canvas.height); // TERRIBLE FOR PERFORMANCE!!! (USE CSS INSTEAD)

    switch(lives) {
        case 3:
            c.fillStyle = 'rgb(255, 255, 255)'
            break;
        case 2:
            c.fillStyle = 'rgb(252, 223, 3)'
            break;
        case 1:
            c.fillStyle = 'rgb(252, 132, 3)'
            break;
        case 0:
            c.fillStyle = 'rgb(212, 57, 30)'
            break;
        case -1: // you lose
            alert('Highscore: ' + String(correct))
            init();
            break;
    }


    c.fill();

    c.font = "30px Arial";
    c.fillStyle = 'blue';
    c.textAlign = 'center';
    c.fillText(userInput, canvas.width/2, canvas.height/2 + 200);

    if (guess.correct(userInput)) {
        userInput = '';
        correct += 1;
    }
    guess.draw();
    guess.descend(1);

    //console.log(guess.currentWordpositions[guess.currentWordpositions.length-1]);
    c.font = "30px calibri";  //???
    c.fillStyle = 'green';
    c.textAlign = 'center';
    c.fillText(correct, canvas.width/2, canvas.height/2 + 170);

    if (userInput == '') {
        firstLetterIn = false;
        for (var i = 0; i < guess.currentWords.length; i++) {
            if (userInput[0] == guess.currentWords[i][0]) {
                firstLetterIn = true;
            }
        }

        if (!firstLetterIn) {
            userInput = '';
        }
    }

    // if (guess.currentWords.length == 25) {
    //     guess.currentWords.pop();
    //     guess.currentWordpositions.pop();
    //     guess.currentWords.push('placeholder');
    //     guess.currentWordpositions.push({x: 0, y: 0});
    // }

    if (!guess.currentWords.length && !guess.wordBank.length) {
        init();
    }



    //console.log(guess.currentWordpositions);
    
}
init();
animate();
updateWords();
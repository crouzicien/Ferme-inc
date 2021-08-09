import { Injectable } from '@angular/core';
import { JoueurService } from '../joueur/joueur.service';

@Injectable({
  providedIn: 'root'
})
export class PlaneteService {
  public current : Planet = null;
  public liste : Planet[] = [];

  public mars: Planet;
  public venus: Planet;
  public jupiter: Planet;

  constructor(joueurService: JoueurService) {
    this.liste.push(new Planet('mars', 450, 190, 80, 70, 1, 0.7, -18, 45, joueurService))
    this.liste.push(new Planet('venus', 1080, 350, 80, 70, 1, 0.7, -18, 45, joueurService))
    this.liste.push(new Planet('jupiter', 1080, -25, 80, 70, 1, 0.7, -18, 45, joueurService))
    this.liste.push(new Planet('jupiter', 120, 130, 80, 70, 1, 0.7, -18, 45, joueurService))
  }

  public select(x, y){
    let finded = false
    this.liste.map(planet => {
      if(x > planet.x && x <( planet.x+planet.width) && y > planet.y && y <( planet.y+planet.height)){
        this.current = planet
        finded = true
        return
      }
    })
    if(!finded) this.current = null
    
  }
}




class Planet {
  img = this.getBatiment()
  minageInProgess = false
  levels: any = {
    mineRate: {
      level: 1,
      value: (0.25 + (0.1) * (1 - 1) + (0.017) * Math.pow(1 - 1, 2)).toFixed(2),
      price() {
        return this.level * 65
      },
      update() {
        if (this.joueurService().credit < this.price() && !this.joueurService().devMode) return
        this.joueurService().credit -= this.price()
        this.level++
        this.value = (0.25 + (0.1) * (this.level - 1) + (0.017) * Math.pow(this.level - 1, 2)).toFixed(2)
      },
      joueurService: () => { return this.joueurService }

    },
    speedShip: {
      level: 1,
      value: (1 + 0.2 * (1 - 1) + (1 / 75) * Math.pow(1 - 1, 2)).toFixed(2),
      price() {
        return this.level * 65
      },
      update() {
        if (this.joueurService().credit < this.price() && !this.joueurService().devMode) return
        this.joueurService().credit -= this.price()
        this.level++
        this.value = (1 + 0.2 * (this.level - 1) + (1 / 75) * Math.pow(this.level - 1, 2)).toFixed(2)
      },
      joueurService: () => { return this.joueurService }

    },
    cargo: {
      level: 1,
      value: (5.1 + 2 * (1 - 1) + 0.1 * Math.pow(1 - 1, 2)).toFixed(0),
      price() {
        return this.level * 65
      },
      update() {
        if (this.joueurService().credit < this.price() && !this.joueurService().devMode) return
        this.joueurService().credit -= this.price()
        this.level++
        this.value = (5.1 + 2 * (this.level - 1) + 0.1 * Math.pow(this.level - 1, 2)).toFixed(0)
      },
      joueurService: () => { return this.joueurService }

    },
  }
  ressources = [
    {
      type: 'bronze',
      percent: 80,
      mined: 0,
      minedInt: 0,
    },
    {
      type: 'fer',
      percent: 20,
      mined: 0,
      minedInt: 0,
    }
  ]
  vaisseau = {
    img : this.getPersonnages(),
    direction: 'vaisseau',
    orientation : 'Bas',
    x: 605,
    y: 405,
    height: 40,
    width: 40,
    vX: 1,
    vY: 0.7,
    angleAlle: -15,
    angleRetour: 45,
    currentStep: 0,
    currentPixel: 0,
    pathCalculated : false,
    decharged : false,
    frame : 0,
    skipFrame : false,
    path : [],
    // space: 20,
    used: 0,
    ressources: [
      {
        type: 'bronze',
        qte: 0
      },
      {
        type: 'fer',
        qte: 0
      }
    ]
  }

  constructor(
    public name,
    public x,
    public y,
    public height,
    public width,
    vX,
    vY,
    angleAlle,
    angleRetour,
    private joueurService: JoueurService
  ) {
    // Centrage du vaisseau sur la planet
    this.vaisseau.x = x +20
    this.vaisseau.y = y+65
    // Affectation de la direction au vaisseau
    this.vaisseau.vX = vX
    this.vaisseau.vY = vY
    this.vaisseau.angleAlle = angleAlle
    this.vaisseau.angleRetour = angleRetour


  }

  getBatiment() {
    let img = new Image();
    img.src = "assets/pack/builds/row-2-col-1.png";
    return img
  }
  getPersonnages() {
    let imgs = []
    for (let e = 0; e < 9; e++) {
      for (let h = 0; h < 4; h++) {
        let img = new Image();
        // console.log("assets/pack/perso/image_" + y + "_" + x + ".png")
        img.src = "assets/pack/perso/image_" + (e+1) + "_" + (h+1) + ".png";
        if (imgs[e] == undefined) imgs[e] = []
        imgs[e][h] = img
      }
    }
    return imgs
  }
  minage() {
    this.ressources.map(ressource => {
      ressource.minedInt += ressource.percent * ((1 * this.levels.mineRate.value) / 60) / 100
      ressource.mined = Math.round(ressource.minedInt)
    })
  }

  mineRateGlobal() {
    let total = 0
    this.ressources.map(res => {
      total += (this.levels.mineRate.value * res.percent / 100)
    })
    return total
  }

  draw(that) {

    that.ctx.drawImage(this.img, this.x, this.y, this.height, this.width);

    let personnage
    if(this.vaisseau.orientation == "Droite") personnage = this.vaisseau.img[1]
    if(this.vaisseau.orientation == "Gauche") personnage = this.vaisseau.img[2]
    if(this.vaisseau.orientation == "Haut") personnage  = this.vaisseau.img[3]
    if(this.vaisseau.orientation == "Bas") personnage  = this.vaisseau.img[4]

    that.ctx.drawImage(personnage[this.vaisseau.frame], (this.vaisseau.x + (that.ville.width / 2) - (this.vaisseau.width / 2)), (this.vaisseau.y + (that.ville.height / 2) - (this.vaisseau.height / 2)), this.vaisseau.height, this.vaisseau.width);


    if(this.vaisseau.skipFrame == false){
      if(this.vaisseau.frame == 3) this.vaisseau.frame = 0
      else this.vaisseau.frame ++

      this.vaisseau.skipFrame = true
    }else this.vaisseau.skipFrame = false


    this.minage()
    this.move(that)
  }
  move(that) {
    if(this.vaisseau.pathCalculated == false) {

      let posStart = [Number.parseInt((this.vaisseau.x / 20).toFixed(0)), Number.parseInt((this.vaisseau.y / 20).toFixed(0))]
      let posEnd = [Number.parseInt((that.fin.x / 20).toFixed(0)), Number.parseInt((that.fin.y / 20).toFixed(0))]
      this.vaisseau.path = findPath(that.ville.plan, posStart, posEnd)
      this.vaisseau.pathCalculated = true
    }

    if (this.vaisseau.currentPixel == 20) {
      this.vaisseau.currentStep++
      this.vaisseau.currentPixel = 0
    }

    if (this.vaisseau.currentStep < this.vaisseau.path.length) {

      let xCible = (this.vaisseau.path[this.vaisseau.currentStep][0] * 20)
      let yCible = (this.vaisseau.path[this.vaisseau.currentStep][1] * 20)


      this.vaisseau.orientation

      if (this.vaisseau.y < yCible) this.vaisseau.orientation = 'Bas'
      if (this.vaisseau.y > yCible) this.vaisseau.orientation = 'Haut'
      if (this.vaisseau.x < xCible) this.vaisseau.orientation = 'Droite'
      if (this.vaisseau.x > xCible) this.vaisseau.orientation = 'Gauche'
      // console.log(direction)

      if (this.vaisseau.y < yCible) this.vaisseau.y++
      if (this.vaisseau.y > yCible) this.vaisseau.y--

      if (this.vaisseau.x < xCible) this.vaisseau.x++
      if (this.vaisseau.x > xCible) this.vaisseau.x--


      let posCurrent = [Number.parseInt((this.vaisseau.x / 20).toFixed(0)), Number.parseInt((this.vaisseau.y / 20).toFixed(0))]
      let posPlanet = [Number.parseInt((this.x / 20).toFixed(0))+1, Number.parseInt((this.y / 20).toFixed(0))+3]
      let posFin = [Number.parseInt((that.fin.x / 20).toFixed(0)), Number.parseInt((that.fin.y / 20).toFixed(0))]

      if(posCurrent[0] == posFin[0] && posCurrent[1] == posFin[1] && this.vaisseau.direction == 'vaisseau') {
        this.dechargement()
        this.vaisseau.path = this.vaisseau.path.reverse()

        this.vaisseau.currentStep = 0
        this.vaisseau.currentPixel = 0
        this.vaisseau.direction = "planet"
      }
      if(posCurrent[0] == posPlanet[0] && posCurrent[1] == posPlanet[1] && this.vaisseau.direction == "planet") {
        this.chargement() 
        this.vaisseau.path = this.vaisseau.path.reverse()

        this.vaisseau.currentStep = 0
        this.vaisseau.currentPixel = 0
        this.vaisseau.direction = "vaisseau"
      }

      this.vaisseau.currentPixel++
    }
  }

  dechargement() {
    // Déchargement
    this.vaisseau.ressources.map(ressource => {
      let ressourceJoueur = this.joueurService.ressources.find(rec => rec.type == ressource.type)
      // Si auto sell > vend direct
      if (ressourceJoueur.autoSell) {
        this.joueurService.vente.sell(ressource)
      }
      // Sinon on fou dans le coffre joueur
      else {
        ressourceJoueur.qte += ressource.qte
      }

      ressource.qte = 0


    })
    this.vaisseau.used = 0
  }

  chargement() {
    for (let i = 0; i < this.levels.cargo.value; i++) {
      this.ressources.map(ress => {
        var d = Math.random();
        if (d < (ress.percent / 100)) {
          if (ress.minedInt >= 1) {

            let emplacementVaisseau = this.vaisseau.ressources.find(x => x.type == ress.type)
            emplacementVaisseau.qte += 1
            this.vaisseau.used += 1
            ress.minedInt -= 1

          }
        }
      })
    }
  }
}


// world is a 2d array of integers (eg world[10][15] = 0)
// pathStart and pathEnd are arrays like [5,10]
function findPath(world, pathStart, pathEnd) {
  // shortcuts for speed
  var abs = Math.abs;
  var max = Math.max;
  var pow = Math.pow;
  var sqrt = Math.sqrt;

  // the world data are integers:
  // anything higher than this number is considered blocked
  // this is handy is you use numbered sprites, more than one
  // of which is walkable road, grass, mud, etc
  var maxWalkableTileNum = 0;

  // keep track of the world dimensions
  // Note that this A-star implementation expects the world array to be square: 
  // it must have equal height and width. If your game world is rectangular, 
  // just fill the array with dummy values to pad the empty space.
  var worldWidth = world[0].length;
  var worldHeight = world.length;
  var worldSize = worldWidth * worldHeight;

  // which heuristic should we use?
  // default: no diagonals (Manhattan)
  var distanceFunction = EuclideanDistance;
  var findNeighbours = function () { }; // empty

	/*

	// alternate heuristics, depending on your game:

	// diagonals allowed but no sqeezing through cracks:
	var distanceFunction = DiagonalDistance;
	var findNeighbours = DiagonalNeighbours;

	// diagonals and squeezing through cracks allowed:
	var distanceFunction = DiagonalDistance;
	var findNeighbours = DiagonalNeighboursFree;

	// euclidean but no squeezing through cracks:
	var distanceFunction = EuclideanDistance;
	var findNeighbours = DiagonalNeighbours;

	// euclidean and squeezing through cracks allowed:
	var distanceFunction = EuclideanDistance;
	var findNeighbours = DiagonalNeighboursFree;

	*/

  // distanceFunction functions
  // these return how far away a point is to another

  function ManhattanDistance(Point, Goal) { // linear movement - no diagonals - just cardinal directions (NSEW)
    return abs(Point.x - Goal.x) + abs(Point.y - Goal.y);
  }

  function DiagonalDistance(Point, Goal) { // diagonal movement - assumes diag dist is 1, same as cardinals
    return max(abs(Point.x - Goal.x), abs(Point.y - Goal.y));
  }

  function EuclideanDistance(Point, Goal) { // diagonals are considered a little farther than cardinal directions
    // diagonal movement using Euclide (AC = sqrt(AB^2 + BC^2))
    // where AB = x2 - x1 and BC = y2 - y1 and AC will be [x3, y3]
    return sqrt(pow(Point.x - Goal.x, 2) + pow(Point.y - Goal.y, 2));
  }

  // Neighbours functions, used by findNeighbours function
  // to locate adjacent available cells that aren't blocked

  // Returns every available North, South, East or West
  // cell that is empty. No diagonals,
  // unless distanceFunction function is not Manhattan
  function Neighbours(x, y) {
    var N = y - 1,
      S = y + 1,
      E = x + 1,
      W = x - 1,
      myN = N > -1 && canWalkHere(x, N),
      myS = S < worldHeight && canWalkHere(x, S),
      myE = E < worldWidth && canWalkHere(E, y),
      myW = W > -1 && canWalkHere(W, y),
      result = [];
    if (myN)
      result.push(
        {
          x: x,
          y: N
        });
    if (myE)
      result.push(
        {
          x: E,
          y: y
        });
    if (myS)
      result.push(
        {
          x: x,
          y: S
        });
    if (myW)
      result.push(
        {
          x: W,
          y: y
        });
    // findNeighbours(myN, myS, myE, myW, N, S, E, W, result);
    return result;
  }

  // returns every available North East, South East,
  // South West or North West cell - no squeezing through
  // "cracks" between two diagonals
  function DiagonalNeighbours(myN, myS, myE, myW, N, S, E, W, result) {
    if (myN) {
      if (myE && canWalkHere(E, N))
        result.push(
          {
            x: E,
            y: N
          });
      if (myW && canWalkHere(W, N))
        result.push(
          {
            x: W,
            y: N
          });
    }
    if (myS) {
      if (myE && canWalkHere(E, S))
        result.push(
          {
            x: E,
            y: S
          });
      if (myW && canWalkHere(W, S))
        result.push(
          {
            x: W,
            y: S
          });
    }
  }

  // returns every available North East, South East,
  // South West or North West cell including the times that
  // you would be squeezing through a "crack"
  function DiagonalNeighboursFree(myN, myS, myE, myW, N, S, E, W, result) {
    myN = N > -1;
    myS = S < worldHeight;
    myE = E < worldWidth;
    myW = W > -1;
    if (myE) {
      if (myN && canWalkHere(E, N))
        result.push(
          {
            x: E,
            y: N
          });
      if (myS && canWalkHere(E, S))
        result.push(
          {
            x: E,
            y: S
          });
    }
    if (myW) {
      if (myN && canWalkHere(W, N))
        result.push(
          {
            x: W,
            y: N
          });
      if (myS && canWalkHere(W, S))
        result.push(
          {
            x: W,
            y: S
          });
    }
  }

  // returns boolean value (world cell is available and open)
  function canWalkHere(y, x) {
    if (x == 2 && y == 1) {
      console.log(x, y, ((world[x] != null) &&
        (world[x][y] != null) &&
        (world[x][y] <= maxWalkableTileNum)))


    }



    return ((world[x] != null) &&
      (world[x][y] != null) &&
      (world[x][y] <= maxWalkableTileNum));
  };

  // Node function, returns a new object with Node properties
  // Used in the calculatePath function to store route costs, etc.
  function Node(Parent, Point) {
    var newNode = {
      // pointer to another Node object
      Parent: Parent,
      // array index of this Node in the world linear array
      value: Point.x + (Point.y * worldWidth),
      // the location coordinates of this Node
      x: Point.x,
      y: Point.y,
      // the heuristic estimated cost
      // of an entire path using this node
      f: 0,
      // the distanceFunction cost to get
      // from the starting point to this node
      g: 0
    };

    return newNode;
  }

  // Path function, executes AStar algorithm operations
  function calculatePath() {
    // create Nodes from the Start and End x,y coordinates
    var mypathStart = Node(null,
      {
        x: pathStart[0],
        y: pathStart[1]
      });
    var mypathEnd = Node(null,
      {
        x: pathEnd[0],
        y: pathEnd[1]
      });
    // create an array that will contain all world cells
    var AStar = new Array(worldSize);
    // list of currently open Nodes
    var Open = [mypathStart];
    // list of closed Nodes
    var Closed = [];
    // list of the final output array
    var result = [];
    // reference to a Node (that is nearby)
    var myNeighbours;
    // reference to a Node (that we are considering now)
    var myNode;
    // reference to a Node (that starts a path in question)
    var myPath;
    // temp integer variables used in the calculations
    var length, max, min, i, j;
    // iterate through the open list until none are left
    while (length = Open.length) {
      max = worldSize;
      min = -1;
      for (i = 0; i < length; i++) {
        if (Open[i].f < max) {
          max = Open[i].f;
          min = i;
        }
      }
      // grab the next node and remove it from Open array
      myNode = Open.splice(min, 1)[0];
      // is it the destination node?
      if (myNode.value === mypathEnd.value) {
        myPath = Closed[Closed.push(myNode) - 1];
        do {
          result.push([myPath.x, myPath.y]);
        }
        while (myPath = myPath.Parent);
        // clear the working arrays
        AStar = Closed = Open = [];
        // we want to return start to finish
        result.reverse();
      }
      else // not the destination
      {
        // find which nearby nodes are walkable
        myNeighbours = Neighbours(myNode.x, myNode.y);
        // test each one that hasn't been tried already
        for (i = 0, j = myNeighbours.length; i < j; i++) {
          myPath = Node(myNode, myNeighbours[i]);
          if (!AStar[myPath.value]) {
            // estimated cost of this particular route so far
            myPath.g = myNode.g + distanceFunction(myNeighbours[i], myNode);
            // estimated cost of entire guessed route to the destination
            myPath.f = myPath.g + distanceFunction(myNeighbours[i], mypathEnd);
            // remember this new path for testing above
            Open.push(myPath);
            // mark this node in the world graph as visited
            AStar[myPath.value] = true;
          }
        }
        // remember this route as having no more untested options
        Closed.push(myNode);
      }
    } // keep iterating until the Open list is empty
    return result;
  }

  return calculatePath();
}

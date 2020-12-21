/**
 *  Main function to run starfieldJS
 *
 *  @param {HTMLCanvasElement} canvas HTML canvas element to render to
 *  @param {Number} num_stars Number of stars to render on the canvas
 *  @param {Number} avg_radius Average radius of a star
 *  @param {String} star_color Color of each star
 *  @param {Number} blink_frequency Average frequency at which each star blinks
 *
 */
function starfieldJS(
  canvas,
  num_stars = 200,
  avg_radius = 2,
  star_color = "white",
  blink_frequency = 7
) {
  /* Error checking */
  if (!canvas) throw "Canvas element undefined";
  num_stars = num_stars <= 0 ? 100 : num_stars;
  avg_radius = avg_radius <= 0 ? 3 : avg_radius;
  blink_frequency = blink_frequency <= 0 ? 8 : blink_frequency;

  class Star {
    constructor(x, y, r, b, f) {
      this.x = x;
      this.y = y;
      this.radius = r;
      this.brightness = b;
      this.frequency = Math.random() * f;
      this.brightness_time = Math.random() * 10;
    }

    /*
     *  Draws a star on the canvas
     */
    draw = (context, color) => {
      context.beginPath();
      context.globalAlpha = this.brightness;
      context.fillStyle = color;

      context.shadowColor = color;
      context.shadowBlur = 50;
      context.arc(
        this.x,
        this.y,
        this.radius * this.brightness,
        0,
        Math.PI * 2,
        true
      );
      context.fill();
      context.closePath();
    };
    /*
     *  Changes brightness based on a sine function
     */

    twinkle = () => {
      this.brightness_time += 0.01;

      var new_brightness =
        0.5 * Math.sin(this.frequency * this.brightness_time) + 0.5;

      this.brightness = new_brightness;
    };
  }

  class StarField {
    /*
     * Collection of star objects
     */
    constructor(canvas, num_stars, avg_r, star_color, frequency) {
      this.canvas = canvas;
      this.ctx = canvas.getContext("2d");
      this.num_stars = num_stars;
      this.avg_radius = avg_r;
      this.star_color = star_color;
      this.stars_array = [];
      this.frequency = frequency;
    }
    /*
     * Returns random number between min and max
     */

    random_num_between = (min, max) => {
      return Math.random() * (max - min) + min;
    };

    /*
     * Initializes canvas with stars
     */

    init = () => {
      for (let i = 0; i < this.num_stars; i++) {
        let star_x_pos = this.random_num_between(0, this.canvas.width);
        let star_y_pos = this.random_num_between(0, this.canvas.height);
        let radius = Math.random() * this.avg_radius;
        let star = new Star(
          star_x_pos,
          star_y_pos,
          radius,
          Math.random(),
          this.frequency
        );
        this.stars_array.push(star);
      }
    };

    /*
     *  Draws stars on the canvas
     */

    draw = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      for (let star of this.stars_array) {
        star.twinkle();
        star.draw(this.ctx, this.star_color);
      }

      window.requestAnimationFrame(this.draw);
    };
  }

  var ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  var starfield = new StarField(
    canvas,
    num_stars,
    avg_radius,
    star_color,
    blink_frequency
  );
  starfield.init();
  window.requestAnimationFrame(starfield.draw);
}

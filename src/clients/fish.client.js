(function(window, document) {
    "use strict"

    /**
     * Blade effect
     * @property {Layer} layer 
     * @property { CanvasRenderingContext2D } ctx
     */
    function fishClient(layer, image, x, y, direction, level, speed) {
        this.layer = layer;
        this.ctx = this.layer.get2dContext();
        this.direction = direction;
        this.speed = (direction === 'left') ? -speed : speed;
        this.level = level;
        this.image = image;
        this.colliable = true;
        this.radius = image.height / 2;

        this.state = {
            timestamp: 0,
            x: x,
            y: y,
            lastX: x
        };
    }

    fishClient.prototype.update = function(timestamp) {
        if (timestamp - this.state.timestamp > 15) {
            if (this.boundaryDetection()) {
                return this.terminate();
            }

            this.render(
                this.image,
                this.state.x,
                this.state.y
            );
            this.state.lastX = this.state.x;
            this.state.x += this.speed;
            this.state.timestamp = timestamp;
        }
    };

    fishClient.prototype.boundaryDetection = function() {
        if (this.direction == 'left') {
            return (this.state.x < -this.image.width);
        } else {
            return (this.state.x > app.numericals.width);
        }
    };

    fishClient.prototype.getLevel = function() {
        return this.level;
    };

    fishClient.prototype.getPosition = function() {
        return {
            x: this.state.x,
            y: this.state.y
        }
    };

    fishClient.prototype.render = function(image, x, y) {
        this.ctx.clearRect(this.state.lastX, y, image.width, image.height);
        this.ctx.drawImage(image, x, y);
    };

    fishClient.prototype.terminate = function() {
        this.ctx.clearRect(this.state.x, this.state.y, this.image.width, this.image.height)
        app.detach(this);
    };

    window.FishClient = fishClient;

})(window, window.document);

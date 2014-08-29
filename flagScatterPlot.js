var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Plottable;
(function (Plottable) {
    (function (Plot) {
        var FlagScatter = (function (_super) {
            __extends(FlagScatter, _super);
            function FlagScatter(dataset, xScale, yScale, clickCallback) {
                _super.call(this, dataset, xScale, yScale);
                this.FLAG_WIDTH = 20;
                this.FLAG_HEIGHT = 15;
                this.CENTER_RATIO = 3 / 8;
                this._animators = {
                    "flags-reset": new Plottable.Animator.Null(),
                    "flags": new Plottable.Animator.IterativeDelay().duration(250).delay(5),
                    "flags-text": new Plottable.Animator.IterativeDelay().duration(250).delay(5),
                    "flags-container": new Plottable.Animator.IterativeDelay().duration(250).delay(5)
                };
                this.classed("scatter-plot", true);
                this.clickCallback = clickCallback;
            }
            FlagScatter.prototype._paint = function () {
                var _this = this;
                _super.prototype._paint.call(this);
                var attrToProjector = this._generateAttrToProjector();
                var xFunction = attrToProjector["x"];
                var yFunction = attrToProjector["y"];
                attrToProjector["d"] = function () { return "m0,-10L" + _this.FLAG_WIDTH + ",-10L" + _this.FLAG_WIDTH + ",-25L0,-25L0,0z"; };
                attrToProjector["stroke"] = function () { return "#C9CBCB"; };
                attrToProjector["stroke-width"] = function () { return "1px"; };
                attrToProjector["fill"] = function () { return "#EDF0F2"; };
                delete attrToProjector["x"];
                delete attrToProjector["y"];
                var containerAttrToProjector = this._generateAttrToProjector();
                containerAttrToProjector["class"] = function () { return "graph-event-flag"; };
                containerAttrToProjector["transform"] = function (d, i) {
                    var x = xFunction(d, i);
                    var y = yFunction(d, i);
                    return "translate(" + x + "," + y + ")";
                };
                delete containerAttrToProjector["x"];
                delete containerAttrToProjector["y"];
                var textAttrToProjector = this._generateAttrToProjector();
                textAttrToProjector["font-family"] = function () { return "BlenderPro-Book"; };
                textAttrToProjector["fill"] = function () { return "#545758"; };
                textAttrToProjector["x"] = function (d, i) {
                    return Math.floor(_this.FLAG_WIDTH * _this.CENTER_RATIO / d.name.length);
                };
                textAttrToProjector["y"] = function () { return -_this.FLAG_HEIGHT; };
                var flagContainers = this.renderArea.selectAll("g").data(this._dataSource.data());
                var container = flagContainers.enter().append("g");
                container.on("click", function (d, i) {
                    if (containerAttrToProjector["class"](d, i).indexOf("active") >= 0) {
                        containerAttrToProjector["class"] = function () { return "graph-event-flag"; };
                    }
                    else {
                        containerAttrToProjector["class"] = function () { return "graph-event-flag active"; };
                    }
                    _this._applyAnimatedAttributes(flagContainers, "flags-reset", containerAttrToProjector);
                    _this.clickCallback(d, i);
                });
                var flags = container.append("path");
                var text = container.append("text");
                text.text(function (d) { return d.name ? d.name : ""; });
                if (this._dataChanged) {
                    this._applyAnimatedAttributes(flagContainers, "flags-reset", containerAttrToProjector);
                }
                this._applyAnimatedAttributes(flags, "flags", attrToProjector);
                this._applyAnimatedAttributes(flagContainers, "flags-container", containerAttrToProjector);
                this._applyAnimatedAttributes(text, "flags-text", textAttrToProjector);
                flagContainers.exit().remove();
            };
            return FlagScatter;
        })(Plottable.Abstract.XYPlot);
        Plot.FlagScatter = FlagScatter;
    })(Plottable.Plot || (Plottable.Plot = {}));
    var Plot = Plottable.Plot;
})(Plottable || (Plottable = {}));

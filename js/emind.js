"use strict";
// emind.js
exports.__esModule = true;
exports.hMargin = 100;
exports.vMargin = 10;
exports.cornerRadius = 5;
exports.cpOffset = 50;
exports.mapPadding = 100;
exports.textHeight = 15;
exports.nodePadding = 10;
exports.nodeClass = 'emind-node';
exports.linkClass = 'emind-link';
exports.textClass = 'emind-text';
function getBase62ShortID(length) {
    var base62Chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var chars = [];
    for (var i = 0; i < length; i += 1) {
        chars.push(base62Chars[Math.floor(Math.random() * 62)]);
    }
    return chars.join('');
}
exports.getBase62ShortID = getBase62ShortID;
var Node = /** @class */ (function () {
    function Node(content) {
        var children = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            children[_i - 1] = arguments[_i];
        }
        var _this = this;
        this.width = 100;
        this.height = 30;
        this.totalHeight = 30;
        this.left = 0;
        this.top = 0;
        this.content = content;
        this.children = [];
        children.forEach(function (node) { return _this.addChild(node); });
        this.id = getBase62ShortID(8);
        this.linkId = this.id + '-link';
        this.textId = this.id + '-text';
    }
    Object.defineProperty(Node.prototype, "right", {
        get: function () {
            return this.left + this.width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Node.prototype, "bottom", {
        get: function () {
            return this.top + this.height;
        },
        enumerable: true,
        configurable: true
    });
    Node.fromSpecObject = function (specObject) {
        var node = new (Node.bind.apply(Node, [void 0, specObject.content].concat((specObject.children || []).map(function (child) { return Node.fromSpecObject(child); }))))();
        node.updateAllRecursively();
        return node;
    };
    Node.fromSpecString = function (spec) {
        var specObject = JSON.parse(spec);
        return Node.fromSpecObject(specObject);
    };
    Node.prototype.toSpecObject = function () {
        return {
            content: this.content,
            children: this.children.length ? this.children.map(function (node) { return node.toSpecObject(); }) : undefined
        };
    };
    Node.prototype.toSpecString = function () {
        return JSON.stringify(this.toSpecObject());
    };
    Node.prototype.toDebugString = function () {
        return "Content=" + this.content + "|Width=" + this.width + "|Height=" + this.height + "|TotalHeight=" + this.totalHeight + "|Left=" + this.left + "|Top=" + this.top;
    };
    Node.prototype.toSvgString = function () {
        var link = '';
        if (!this.isRoot()) {
            var parent_1 = this.parent;
            var _a = [this.left, this.top + this.height / 2], x0 = _a[0], y0 = _a[1];
            var _b = [parent_1.right, parent_1.top + parent_1.height / 2], x = _b[0], y = _b[1];
            var _c = [this.left - exports.cpOffset, this.top + this.height / 2], x1 = _c[0], y1 = _c[1];
            var _d = [parent_1.right + exports.cpOffset, parent_1.top + parent_1.height / 2], x2 = _d[0], y2 = _d[1];
            link = "<path id=\"" + this.linkId + "\" class=\"" + exports.linkClass + "\" d=\"M" + x0 + " " + y0 + " C " + x1 + " " + y1 + ", " + x2 + " " + y2 + ", " + x + " " + y + "\" stroke=\"black\" fill=\"transparent\" />";
        }
        return "<rect id=\"" + this.id + "\" class=\"" + exports.nodeClass + "\" x=\"" + this.left + "\" y=\"" + this.top + "\" width=\"" + this.width + "\" height=\"" + this.height + "\" rx=\"" + exports.cornerRadius + "\" ry=\"" + exports.cornerRadius + "\" stroke=\"black\" fill=\"transparent\" /><text id=\"" + this.textId + "\" class=\"" + exports.textClass + "\" x=\"" + (this.left + exports.nodePadding) + "\" y=\"" + (this.top + this.height / 2 + exports.textHeight / 2) + "\" text-anchor=\"left\" font-size=\"" + exports.textHeight + "\">" + this.content + "</text>" + link;
    };
    Node.prototype.isRoot = function () {
        return !this.parent;
    };
    Node.prototype.isLeaf = function () {
        return this.children.length === 0;
    };
    Node.prototype.addChild = function (node) {
        node.parent = this;
        this.children.push(node);
    };
    Node.prototype.walk = function (action) {
        action(this);
        this.children.forEach(function (node) { return node.walk(action); });
    };
    Node.prototype.updateWidth = function () {
        this.width = 100;
    };
    Node.prototype.updateHeight = function () {
        this.height = 30;
    };
    Node.prototype.updateAllRecursively = function () {
        this.updateSizeRecursively();
        this.updateTotalHeightRecursively();
        this.updateLeftRecursively();
        this.updateTopRecursively();
    };
    Node.prototype.updateSizeRecursively = function () {
        this.walk(function (node) {
            node.updateWidth();
            node.updateHeight();
        });
    };
    Node.prototype.updateTotalHeightRecursively = function () {
        this.children.forEach(function (node) { return node.updateTotalHeightRecursively(); });
        if (this.isLeaf()) {
            this.totalHeight = this.height;
        }
        else {
            this.totalHeight = this.children.map(function (node) { return node.totalHeight; }).reduce(function (x, y) { return x + y; }, 0) + exports.vMargin * (this.children.length - 1);
        }
    };
    Node.prototype.updateLeft = function () {
        if (this.isRoot()) {
            this.left = -this.width / 2;
        }
        else {
            this.left = this.parent.right + exports.hMargin;
        }
    };
    Node.prototype.updateLeftRecursively = function () {
        this.walk(function (node) { return node.updateLeft(); });
    };
    Node.prototype.updateTopRecursively = function () {
        if (this.isRoot()) {
            this.top = -this.height / 2;
            this.updateChildrenTopsRecursively();
        }
    };
    Node.prototype.updateChildrenTopsRecursively = function () {
        if (this.children.length > 0) {
            var acumuTop = this.top + this.height / 2 - this.totalHeight / 2 + this.children[0].totalHeight / 2 - this.children[0].height / 2;
            for (var i = 0; i < this.children.length; i++) {
                var node = this.children[i];
                node.top = acumuTop;
                node.updateChildrenTopsRecursively();
                if (i < this.children.length - 1) {
                    var next = this.children[i + 1];
                    acumuTop += node.totalHeight / 2 + next.totalHeight / 2 + node.height / 2 - next.height / 2;
                    acumuTop += exports.vMargin;
                }
            }
        }
    };
    return Node;
}());
exports.Node = Node;
var MindMap = /** @class */ (function () {
    function MindMap(root) {
        this.root = root;
    }
    MindMap.fromSpecString = function (spec) {
        return new MindMap(Node.fromSpecString(spec));
    };
    MindMap.prototype.toSpecString = function () {
        return this.root.toSpecString();
    };
    MindMap.prototype.toSvgString = function () {
        var content = '';
        this.root.walk(function (node) { return content += node.toSvgString(); });
        var _a = this.getBoundingBox(), left = _a[0], top = _a[1], right = _a[2], bottom = _a[3];
        _b = [left - exports.mapPadding, top - exports.mapPadding, right + exports.mapPadding, bottom + exports.mapPadding], left = _b[0], top = _b[1], right = _b[2], bottom = _b[3];
        return "<svg width=\"" + (right - left) + "\" height=\"" + (bottom - top) + "\" viewBox=\"" + left + " " + top + " " + (right - left) + " " + (bottom - top) + "\" xmlns=\"http://www.w3.org/2000/svg\">" + content + "</svg>";
        var _b;
    };
    MindMap.prototype.getBoundingBox = function () {
        var _a = [this.root.left, this.root.top, this.root.right, this.root.bottom], left = _a[0], top = _a[1], right = _a[2], bottom = _a[3];
        this.root.walk(function (node) {
            left = Math.min(left, node.left);
            top = Math.min(top, node.top);
            right = Math.max(right, node.right);
            bottom = Math.max(bottom, node.bottom);
        });
        return [left, top, right, bottom];
    };
    return MindMap;
}());
exports.MindMap = MindMap;

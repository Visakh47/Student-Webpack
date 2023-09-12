"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexedDBManager = void 0;
var IndexedDBManager = /** @class */ (function () {
    function IndexedDBManager(databaseName, version) {
        this.db = null;
        this.databaseName = databaseName;
        this.version = version;
        this.db = null;
        this.dbPromise = this.initialize();
    }
    IndexedDBManager.prototype.initialize = function () {
        return __awaiter(this, void 0, void 0, function () {
            var request, dbPromise;
            var _this = this;
            return __generator(this, function (_a) {
                if (this.db)
                    return [2 /*return*/, Promise.resolve(this.db)];
                request = indexedDB.open(this.databaseName, this.version);
                request.onupgradeneeded = function (event) {
                    console.log("Database is Upgrading");
                    _this.db = event.target.result;
                    if (!_this.db.objectStoreNames.contains('studentDetails'))
                        _this.db.createObjectStore("studentDetails", { keyPath: "id", autoIncrement: true });
                };
                dbPromise = new Promise(function (resolve, reject) {
                    request.onsuccess = function (event) {
                        _this.db = event.target.result;
                        console.log("Connected to DB");
                        _this.db.onerror = function (event) {
                            console.error("Database error: ".concat(event.target.error));
                        };
                        resolve(_this.db);
                    };
                    request.onerror = function (event) {
                        console.error("Database Error!");
                        reject(event.target.error);
                    };
                });
                return [2 /*return*/, dbPromise];
            });
        });
    };
    //Used any because these are DB operations and the item can be of anytype - not stricly student
    IndexedDBManager.prototype.add = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var transaction, studentTable, request;
            return __generator(this, function (_a) {
                transaction = this.db.transaction(['studentDetails'], 'readwrite');
                studentTable = transaction.objectStore('studentDetails');
                console.log(studentTable);
                request = studentTable.add(item);
                request.onsuccess = function (event) {
                    console.log("Database Insert OP success", event.target.result);
                };
                return [2 /*return*/];
            });
        });
    };
    IndexedDBManager.prototype.edit = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var transaction, studentTable, request;
            return __generator(this, function (_a) {
                transaction = this.db.transaction(['studentDetails'], 'readwrite');
                studentTable = transaction.objectStore('studentDetails');
                console.log(studentTable);
                request = studentTable.put(item);
                request.onsuccess = function (event) {
                    console.log("Database EDIT OP success", event.target.result);
                };
                return [2 /*return*/];
            });
        });
    };
    IndexedDBManager.prototype.getAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        if (!_this.db) {
                            reject(new Error("Database not initialized"));
                            return;
                        }
                        var transaction = _this.db.transaction(['studentDetails'], 'readwrite');
                        var studentTable = transaction.objectStore('studentDetails');
                        var request = studentTable.getAll();
                        request.onsuccess = function (event) {
                            console.log("Retrieved All Data");
                            resolve(event.target.result);
                        };
                        request.onerror = function (event) {
                            console.log("Failed to retrived all data");
                            reject();
                        };
                    })];
            });
        });
    };
    IndexedDBManager.prototype.deleteById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var transaction, studentTable, request;
            return __generator(this, function (_a) {
                transaction = this.db.transaction(['studentDetails'], 'readwrite');
                studentTable = transaction.objectStore('studentDetails');
                request = studentTable.delete(id);
                request.addEventListener('success', function () {
                    console.log("Deleted student with ".concat(id));
                });
                return [2 /*return*/];
            });
        });
    };
    IndexedDBManager.prototype.getById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var transaction = _this.db.transaction(['studentDetails'], 'readwrite');
                        var studentTable = transaction.objectStore('studentDetails');
                        var request = studentTable.get(id);
                        request.onsuccess = function (event) {
                            var data = event.target.result;
                            console.log("Received object ".concat(data));
                            resolve(data);
                        };
                        request.onerror = function (event) {
                            console.error("Error in finding Object");
                            reject();
                        };
                    })];
            });
        });
    };
    return IndexedDBManager;
}());
exports.IndexedDBManager = IndexedDBManager;

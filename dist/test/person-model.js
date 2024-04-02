"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Person = void 0;
const column_decorator_1 = require("../src/repository/decorators/column-decorator");
const key_decorator_1 = require("../src/repository/decorators/key-decorator");
const table_decorator_1 = require("../src/repository/decorators/table-decorator");
let Person = class Person {
    id;
    name;
    birthday;
};
exports.Person = Person;
__decorate([
    (0, key_decorator_1.Key)(),
    (0, column_decorator_1.Column)('cd_id'),
    __metadata("design:type", String)
], Person.prototype, "id", void 0);
__decorate([
    (0, column_decorator_1.Column)('ds_name'),
    __metadata("design:type", String)
], Person.prototype, "name", void 0);
__decorate([
    (0, column_decorator_1.Column)('date_birth'),
    __metadata("design:type", String)
], Person.prototype, "birthday", void 0);
exports.Person = Person = __decorate([
    (0, table_decorator_1.Table)('person')
], Person);
//# sourceMappingURL=person-model.js.map
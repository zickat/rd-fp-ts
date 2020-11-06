import {service1, Service1Class} from './services/service1';
import {Service2Class} from "./services/service2";
import {Service4Class} from "./services/service4";
import {Service3Class} from "./services/service3";

const res = service1('Val');

// console.log(res);

const s4 = new Service4Class();
const s3 = new Service3Class(s4);
const s2 = new Service2Class();
const s1 = new Service1Class(s2, s3);

const resClass = s1.service1('Val');

console.log(resClass);
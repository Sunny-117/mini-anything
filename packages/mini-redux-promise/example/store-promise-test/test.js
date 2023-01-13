import store from "./index";
import { fetchStudents } from "./action/student/searchResult";
console.log(store.getState())
// console.log(store.getState().students)
store.dispatch(fetchStudents(store.getState().students.condition));

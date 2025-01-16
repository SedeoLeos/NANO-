import axios from "axios";

const local="http://localhost:3000";

export const api= axios.create({baseURL:`${local}/api`});

import { setupFrontend } from "./setup-frontend";
import { setupBackend } from "./backend-logic";
import { setupListening } from "./setup-listening";

import { displayProjectTodo } from "../displayController/todo-display-controller";

setupFrontend();
setupBackend();
setupListening();

displayProjectTodo();
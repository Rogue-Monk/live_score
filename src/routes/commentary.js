import {Router} from "express";
import (eq, desc) from "drizzle-orm";
import {matchIdParamSchema} from "../validation/matches.js";


const MAX_LIMIT = 100;
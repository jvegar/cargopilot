import { StorableAggregateRoot } from "@cargopilot/event-sourcing";
import { v4 as uuidv4 } from 'uuid';
import {
  Break, 
  Breakdown, 
  CheckPoint, 
  Stop,
  Workday,
  ClockInCommand,
  AddStopCommand,
  ClockOutCommand,
  CreateWorkdayCommand,
  DeleteWorkdayCommand,
  EndBreakCommand,
  EndBreakdownCommand,
  StartBreakCommand,
  StartBreakdownCommand,
  UpdateWorkdayCommand,
  
} from "@cargopilot/microservice.core";


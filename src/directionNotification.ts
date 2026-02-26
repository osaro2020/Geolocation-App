import { toast } from './toast';

export function notification(directions:any){
    if(window.user.movement == "driver" && directions.get(0).length > 0 && directions.get(1).length > 0){
        toast("Cyclist Moving: " + directions.get(0) + ", Pedestrian Moving: " + directions.get(1), 7000, "top");
      } else if(window.user.movement == "driver" && directions.get(0).length > 0){
        toast("Cyclist Moving: " + directions.get(0), 5000, "top");
      } else if(window.user.movement == "driver" && directions.get(1).length > 0){
        toast("Pedestrian Moving: " + directions.get(1), 5000, "top");
      } else if(window.user.movement == "biker" && directions.get(0).length > 0){
        toast("Driver Moving: " + directions.get(0), 5000, "top");
      } else if(window.user.movement == "walker" && directions.get(0).length > 0){
        toast("Driver Moving: " + directions.get(0), 5000, "top");
      }
      
}
import { useHistory } from "react-router";

export function endRoute(){

    const history = useHistory();

    history.push('/menu');

}
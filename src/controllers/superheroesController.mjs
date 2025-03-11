import { obtenerSuperHeroePorId, obtenerTodosLosSuperHeroes, buscarSuperHeroesPorAtributo, obtenerSuperHeroesMayoresDe30 } from '../services/superheroesService.mjs';
import { renderizarSuperheroe, renderizarListasSuperheroes } from '../views/responseView.mjs';


export async function obtenerSuperheroePorIdController(req, res) {
    try {

        const { id } = req.params;
        const superheroe = await obtenerSuperHeroePorId(id);
        if (!superheroe) {
            return res.status(404).send({ mensaje: 'Superhéroe no encontrado' });
        }

        const superheroeFormateado = renderizarSuperheroe(superheroe);
        res.status(200).json(superheroeFormateado);

    } catch (error) {

        res.status(500).send({ mensaje: 'Error al obtener el superhéroe', error: error.message });

    }
}


export async function obtenerTodosLosSuperheroesController(req, res) {
    try {
        const superheroes = await obtenerTodosLosSuperHeroes();

        const superheroesFormateados = renderizarListasSuperheroes(superheroes);
        res.status(200).json(superheroesFormateados);

    } catch (error) {

        res.status(500).send({ mensaje: 'Error al obtener los superhéroes', error: error.message });
    }
}


export async function buscarSuperheroesPorAtributoController(req, res) {
    try {

        const { atributo, valor } = req.params;
        const superheroes = await buscarSuperHeroesPorAtributo(atributo, valor);
        if (superheroes.length === 0) {
            return res.status(404).send({ mensaje: 'No se encontraron superhéroes con ese atributo' });
        }

        const superheroesFormateado = renderizarListasSuperheroes(superheroes);
        res.status(200).json(superheroesFormateado);

    } catch (error) {

        res.status(500).send({ mensaje: 'Error al buscar los superhéroes', error: error.message });

    }
}


export async function obtenerSuperheroesMayoresDe30Controller(req, res) {

    try {
        
        const superheroes = await obtenerSuperHeroesMayoresDe30();
        if (superheroes.length === 0) {
            return res.status(404).send({ mensaje: 'No se encontraron superhéroes mayores de 30 años' });
        }

        const superheroesFormateado = renderizarListasSuperheroes(superheroes);
        res.status(200).json(superheroesFormateado);

    } catch (error) {
        
        res.status(500).send({ mensaje: 'Error al obtener superhéroes mayores de 30', error: error.message });

    }
}
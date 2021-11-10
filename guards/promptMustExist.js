const db = require( "../model/helper" );

async function promptMustExist( req, res, next ) {
  try {
    const { prompt_id } = req.params;
    const results = await db(
      `SELECT * FROM prompts WHERE prompt_id=${ prompt_id }` );
    if ( !results.data.length ) {
        return res.status( 404 ).send( { message: "Prompt not found." } );
    }
    req.prompt = results.data[ 0 ];
    next();
} catch ( err ) {
    res.status( 500 ).send( err );
}
}

module.exports = promptMustExist;


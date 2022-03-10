import { NextFunction, Request } from 'express';
import jwt from 'jsonwebtoken';
import { isNil } from 'lodash';
import config from '../../../config/config';
import { JwtAuth } from '../../db/models';
import { ApiMessages } from '../shared/api-messages';
import { DefaultResponse } from '../shared/interfaces';
import { Helper } from '../v1/helper';

export async function checkJwtAuth(req: Request, res: DefaultResponse, next: NextFunction) {
    const { token, payload } = Helper.getJwtAndPayload(req);

    if (isNil(token) || !payload) {
        return res.status(401).json({ errors: ApiMessages.common.unauthorized });
    }

    let createdToken: any;
    let valid;
    try {
        createdToken = await JwtAuth.findOne({
            raw: true,
            where: {
                jwt: token,
            },
        });

        if (isNil(createdToken)) {
            console.log('jwt not found')
            return res.status(401).json({ errors: ApiMessages.common.unauthorized });
        }

        valid = jwt.verify(token, config.jwtSecret);
    } catch (err: any) {
        if (err.toString().includes('TokenExpiredError')) {
            await JwtAuth.destroy({
                where: {
                    id: createdToken.id,
                },
            });

            return res.status(401).json({ errors: ApiMessages.auth.expiredToken });
        }

        return res.status(500).json({ errors: err });
    }

    if (valid) {
        return next();
    } else {
        return res.status(500).json({ errors: ApiMessages.common.unexpectedError });
    }
}

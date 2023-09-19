import { check } from 'express-validator';

const validationProduct = [
    check('title').isString().withMessage('El título es obligatorio y debe ser string').isLength({ min: 3 }).withMessage('El título debe contener al menos 3 caracteres'),
    check('description').isString().withMessage('La descripción es obligatoria y debe ser string'),
    check('type').isIn(['libros', 'audifonos']).withMessage("El tipo debe ser 'libros' o 'audifonos'"),
    check('status').isString().withMessage('El estado del producto es obligatorio'),
    ];

const validationUser = [
    check('rol').isIn([2]).withMessage("Debe ser un rol válido es decir,  'User'"),
    check('team').isString().withMessage('El team es obligatorio y debe ser string'),
    check('phone').isString().withMessage('El teléfono es obligatorio y debe cumplir con ciertas restricciones').isLength({ min: 9 }).withMessage('El teléfono debe contener al menos 9 caracteres').withMessage('El teléfono debe cumplir con el formato +57 3123456789'),
    check('username').isString().withMessage('El nombre de usuario es obligatorio y debe ser string').isLength({ min: 3 }).withMessage('El nombre de usuario debe contener al menos 3 caracteres'),
    check('identification').isString().withMessage('La identificación es obligatoria y debe ser string'),
    check('email').isEmail().withMessage('El correo electrónico es obligatorio y debe ser válido'),
    check('password').isString().withMessage('La contraseña es obligatoria y debe ser string').isLength({ min: 5 }).withMessage('La contraseña debe contener al menos 5 caracteres'),
    ];

const validationAdmin = [
    check('rol').isIn([1]).withMessage("Debe ser un rol válido es decir, 'Admin'"),
    check('full_name').isString().withMessage('El nombre completo es obligatorio y debe ser string').isLength({ min: 3 }).withMessage('El nombre completo debe contener al menos 3 caracteres'),
    check('identification').isString().withMessage('La identificación es obligatoria y debe ser string'),
    check('email').isEmail().withMessage('El correo electrónico es obligatorio y debe ser válido'),
    check('password').isString().withMessage('La contraseña es obligatoria y debe ser string').isLength({ min: 5 }).withMessage('La contraseña debe contener al menos 5 caracteres'),
    ];

const validationLogin = [
    check('ROL').isIn(["Super_Admin", "Admin", "User"]).withMessage("Debe ser un estado valido es decir, 'Super_Admin', 'Admin', 'User'"),
    check('ROL_EMAIL').isEmail().withMessage('el ROL_EMAIL es obligatorio y debe ser string ademas debe cumplir las caracteristicas de un e-mail'),
    check('ROL_PASSWORD').isString().withMessage('la ROL_PASSWORD es obligatoria y debe ser string'),
];
export { validationLogin, validationAdmin, validationProduct, validationUser};
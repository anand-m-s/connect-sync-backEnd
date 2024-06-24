"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userProfileUseCase_1 = __importDefault(require("../../../app/usecases/users/profile/userProfileUseCase"));
exports.default = {
    getUserDetails: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log('inside getUserdetails');
            const userId = req.query.id;
            const currentUser = req.user.userId;
            console.log({ currentUser });
            // if (typeof userId !== 'string') {
            //     res.status(400).json({ error: 'Invalid user ID' });
            //     return;
            //   }          
            const userDetails = yield userProfileUseCase_1.default.getUserDetails({ id: userId, current: currentUser });
            res.json(userDetails);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),
    updateProfile: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(req.body);
        try {
            const updatedUser = yield userProfileUseCase_1.default.updateProfileUseCase(req.body);
            res.json(updatedUser);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),
    getAllUserDetails: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const searchTerm = req.query.searchTerm;
            console.log('inside controller lookin for search term');
            console.log(searchTerm);
            res.json(yield userProfileUseCase_1.default.getAllUserDetails(searchTerm));
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),
    followToggle: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userId = req.user.userId;
            const { userIdToToggle } = req.body;
            console.log(userId, 'userId');
            console.log(userIdToToggle, 'userIdto toggle');
            if (userId && userIdToToggle) {
                const message = yield userProfileUseCase_1.default.toggleFollow(userId, userIdToToggle);
                console.log(message);
                res.status(200).json({ message: message });
            }
            else {
                res.status(400).json({ error: 'User ID not found' });
            }
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),
    followingData: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userId = req.query.userId;
            console.log(userId);
            const data = yield userProfileUseCase_1.default.followingUseCase(userId);
            console.log({ data });
            res.status(200).json({ data });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    })
};

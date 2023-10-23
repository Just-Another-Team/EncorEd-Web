const {
    db,
    Timestamp,
} = require('../database');
const {
    Institution,
    institutionConverter
} = require("../models/institution.model")

const institutionCollection = db.collection(`/institutions/`).withConverter(institutionConverter)

const addInstitution = async (req, res) => {
    try {
        const { name, desc, status = "Open" } = req.body;

        let institution = new Institution(
            name,
            desc,
            new Date(),
            status
        )

        //If name is same as institution id
        const institutionId = institution.name.toLowerCase().replace(/\s/g,'')

        await institutionCollection.doc(institutionId).create(institution)
            // .then((result) => {
            //     res.status(200).json({data: result, message: "Institution added successfully"})
            // })
            // .catch((err) => {
            //     throw {message: err.message}
            // })

        const institutionRef = await institutionCollection.doc(institutionId).get()

        res.status(200).json({id: institutionId, message: "Institution added successfully", ...institutionRef.data()})
    } catch (e) {
        console.log(e);
        res.status(400).json({name: "Institution", type: "Add", type: e.type, message: e.message, code: e.code})
    }
}

const updateInstitution = async (req, res) => {
    const id = req.params.id;

    try {
        const institutionDocRef = db.doc(`/institutions/${id}`).withConverter(institutionConverter);

        //If ID exist

        const { name, desc, status } = req.body;

        let institution = new Institution(
            name,
            desc,
            new Date(),
            status
        )

        await institutionDocRef.update(Object.assign({}, institution))
            .then((result) => {
                res.status(200).json({message: "Institution updated successfully!"})
            })
            .catch((err) => {
                throw {message: err.message}
            })

    } catch (e) {
        res.status(400).json({name: "Institution", type: "Update", error: e.message})
    }
}

const deleteInstitution = async (req, res) => {
    const id = req.params.id;

    try {
        const institutionSnapshot = db.doc(`/institutions/${id}`).withConverter(institutionConverter);

        //If id exists

        await institutionSnapshot.delete()
            .then((result) => {
                res.status(200).json({message: "Institution deleted successfully."})
            })
            .catch((err) => {
                throw {error: err, message: err.message}
            })
    } catch (e) {
        res.status(400).json({error: e.message})
        console.log(e.error)
    }
}

const viewAllInstitutions = async (req, res) => {
    const institutions = []

    try {
        const getInstitutionDocs = await institutionCollection.get()

        if (getInstitutionDocs.empty)
            throw {message: "Institutions collections is empty"};


        getInstitutionDocs.forEach((institution) => {
            const {
                name,
                desc,
                creationDate,
                status 
            } = institution.data();

            institutions.push({
                id: institution.id,
                name: name,
                desc: desc,
                creationDate: new Timestamp(creationDate.seconds, creationDate.nanoseconds).toDate(),
                status: status
            })
        })

        res.status(200).json(institutions)
    }
    catch(e) {
        res.status(400).json({error: e.message})
        console.log(e)
    }
}

const viewInstitution = async (req, res) => {
    const id = req.params.id;

    try {
        const institutionDoc = await institutionCollection.doc(id).get();

        res.status(200).json({
            id: institutionDoc.id,
            ...institutionRef.data()
        })
    }
    catch (e) {
        res.status(400).json({error: "Error", message: e.message})
    }
}

module.exports = {
    addInstitution,
    updateInstitution,
    deleteInstitution,
    viewAllInstitutions,
    viewInstitution
}
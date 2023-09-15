const {
    db,
    Timestamp,
    addDoc,
    getDoc,
    getDocs,
    doc,
    collection,
    updateDoc,
    deleteDoc,
    where
} = require('../database');
const {
    Institution,
    institutionConverter
} = require("../models/institution.model")

const institutionCollection = collection(db, "institutions").withConverter(institutionConverter)

const addInstitution = async (req, res) => {
    try {
        const { name, desc, creationDate, status } = req.body;

        let institution = new Institution(
            name,
            desc,
            new Date(creationDate),
            status
        )

        console.log(institution);

        const institutionDoc = await addDoc(institutionCollection, institution)

        res.status(200).json({id: institutionDoc.id, message: "Institution added successfully"})
    } catch (e) {
        res.status(400).json({error: e.message})
    }
}

const updateInstitution = async (req, res) => {
    const id = req.params.id;

    try {
        const institutionSnapshot = await doc(db, `/institutions/${id}`).withConverter(institutionConverter);

        //If ID exist

        const { name, desc, creationDate, status } = req.body;

        let institution = new Institution(
            name,
            desc,
            new Date(creationDate),
            status
        )

        updateDoc(institutionSnapshot, {
            name: institution.getName,
            desc: institution.getDesc,
            creationDate: institution.getCreationDate,
            status: institution.getStatus
        })

        res.status(200).json({message: "Institution updated successfully!"})
    } catch (e) {
        res.status(400).json({error: e.message})
    }
}

const deleteInstitution = async (req, res) => {
    const id = req.params.id;

    try {
        const institutionSnapshot = doc(db, `/institutions/${id}`).withConverter(institutionConverter);

        //If id exists

        await deleteDoc(institutionSnapshot);

        res.status(200).json({message: "Institution deleted successfully."})
    } catch (e) {
        res.status(400).json({error: e.message})
    }
}

const viewAllInstitutions = async (req, res) => {
    const institutions = []

    try {
        const getInstitutionDocs = await getDocs(institutionCollection)

        if (getInstitutionDocs.empty)
            throw new Error("Institutions collections is empty");

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
    
}

module.exports = {
    addInstitution,
    updateInstitution,
    deleteInstitution,
    viewAllInstitutions
}
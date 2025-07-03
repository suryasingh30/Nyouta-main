import fs from 'fs';
import path from 'path';
import ejs from 'ejs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import User from '../models/User.js';
import WeddingWebsite from '../models/WeddingWebsite.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const formatName = (name) => {
    return name.toLowerCase().replace(/\s+/g, '-');
}

export const getWeddingWebsitePreview = async (req, res) => {
    try {
        const { templateId } = req.params;
        const templatesDir = path.join(__dirname, '../uploads/templates');
        const filePath = path.join(templatesDir, `${templateId}.ejs`);
        const content = fs.readFileSync(filePath, 'utf-8');
        const { userId} = req.user;
        const user = await User.findById(userId);
        const html = ejs.render(content, {
            name: user.name,
            partnerName: user.partnerName,
            weddingDate: user.weddingDate,
        });
        // console.log(html);
        res.status(200).json({ message: 'Wedding website fetched successfully', html });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const createWeddingWebsite = async (req, res) => {
    try {
        const { userId } = req.user;
        const { templateId } = req.params;
        const user = await User.findById(userId);
        const weddingWebsite = await WeddingWebsite.findOne({ user: userId });
        let slug;
        if (weddingWebsite) {
            slug = `${formatName(weddingWebsite.home.name)}-${formatName(weddingWebsite.home.partnerName)}-${userId}`;
        }
        else{
            slug = `${formatName(user.name)}-${formatName(user.name)}-${userId}`;
        }
        user.slug = slug;
        user.templateId = templateId;
        user.isWebsiteCreated = true;
        await user.save();
        res.status(200).json({ message: 'Wedding website created successfully', slug });
    } catch (error) {
        // console.log(error);
        res.status(500).json({ message: error.message });
    }
}

export const updateWeddingWebsite = async (req, res) => {
    try {
        const { userId } = req.user;
        const { templateId } = req.params;
        const user = await User.findById(userId);
        user.templateId = templateId;
        await user.save();
        res.status(200).json({ message: 'Wedding website updated successfully', slug: user.slug });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getWeddingWebsite = async (req, res) => {
    try {
        const { slug } = req.params;
        // console.log(slug);
        const user = await User.findOne({ slug });
        // console.log(user);
        if (!user) {
            return res.status(404).json({ message: 'Wedding website not found' });
        }
        const weddingWebsite= await WeddingWebsite.find({user: user._id});
        if(weddingWebsite&&user.websitePassword){
            return res.status(401).json({ message: 'Password Required' });
        }
        // console.log(weddingWebsite);
        const templateId = user.templateId;
        const templatesDir = path.join(__dirname, '../uploads/templates');
        const filePath = path.join(templatesDir, `${templateId}.ejs`);
        const content = fs.readFileSync(filePath, 'utf-8');
        if(!weddingWebsite){
            const html = await ejs.render(content, {
                home: null,
                about: null,
                ourStory: null,
                socialLinks: null,
                tags: null,
                eventInfo: null,
                gallery:null
            });
            res.status(200).json({ message: 'Wedding website fetched successfully', html });
        }
        else{
            // console.log(weddingWebsite)
            const html = await ejs.render(content,{
                home: weddingWebsite[0].home,
                about: weddingWebsite[0].about,
                ourStory: weddingWebsite[0].ourStory,
                socialLinks: weddingWebsite[0].socialLinks,
                tags: weddingWebsite[0].tags,
                eventInfo: weddingWebsite[0].eventInfo,
                gallery: weddingWebsite[0].gallery,
            }); 
            // console.log(html);
            res.status(200).json({ message: 'Wedding website fetched successfully', html });
        }
    } catch (error) {
        // console.log(error);
        res.status(500).json({ message: error.message });
    }
}
function formatNamesAndId(name1, name2, id) {
    // Convert both names to lowercase and replace spaces with hyphens
    const formattedName1 = name1.toLowerCase().replace(/\s+/g, '-');
    const formattedName2 = name2.toLowerCase().replace(/\s+/g, '-');
    
    // Concatenate the formatted names and append the ID
    return `${formattedName1}-${formattedName2}-${id}`;
}

export const updateWeddingWebsitedata = async (req, res) => {
    try {
        const {home,about,ourStory,socialLinks,tags,eventInfo,gallery,websitePassword} = req.body;
        const { userId } = req.user; 
        const { id } = req.params; // Get templateId from params

        // Check if user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // console.log(user.slug);
        user.slug=formatNamesAndId(home.name,home.partnerName,user._id);
        user.websitePassword=websitePassword;
        // console.log(user.slug);
        await user.save();
        // Check if WeddingWebsite exists
        const weddingWebsite = await WeddingWebsite.findOne({user: userId});
        if (!weddingWebsite) {
            const newWeddingWebsite = new WeddingWebsite({
                user: userId,
                ...req.body,
            })
            await newWeddingWebsite.save();
            return res.status(200).json({
                message: "Wedding website data updated successfully",
                weddingWebsite: newWeddingWebsite,
            });
        }

        // Update WeddingWebsite
        weddingWebsite.user = userId;
        weddingWebsite.home = home;
        // weddingWebsite.about = about;
        weddingWebsite.about.bride.description=about.bride.description;
        weddingWebsite.about.bride.image = Array.isArray(about.bride.image) ? about.bride.image[0] : about.bride.image;
        weddingWebsite.about.groom.description=about.groom.description;
        weddingWebsite.about.groom.image = Array.isArray(about.groom.image) ? about.groom.image[0] : about.groom.image;
        weddingWebsite.ourStory = ourStory;
        weddingWebsite.socialLinks = socialLinks;
        weddingWebsite.tags = tags;
        weddingWebsite.eventInfo = eventInfo;
        weddingWebsite.gallery = gallery;
        await weddingWebsite.save();
        res.status(200).json({
            message: "Wedding website data updated successfully",
            weddingWebsite,
        });
    } catch (error) {
        console.error("Error updating wedding website:", error.message);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
};

export const getweddingWebsitedata=async(req,res)=>{
    try{
        const { userId } = req.user;
        const weddingWebsite = await WeddingWebsite.findOne({user: userId});
        if (!weddingWebsite) {
            return res.status(404).json({ message: "Wedding website not found" });
        }
        res.status(200).json({
            message: "Wedding website data fetched successfully",
            data:weddingWebsite,
        });
    }
    catch(err){
        return res.status(500).json({ message: "Server error. Please try again later." });
    }
}

export const verifyWeddingWebsite = async (req, res) => {
    try {
        const { password, slug } = req.body;
        const user = await User.findOne({ slug });
        if (!user) {
            return res.status(404).json({ message: "Wedding website not found" });
        }
        if (user.websitePassword === password) {
            // Fetch the wedding website data
            const weddingWebsite = await WeddingWebsite.find({ user: user._id });
            const templateId = user.templateId;
            const templatesDir = path.join(__dirname, '../uploads/templates');
            const filePath = path.join(templatesDir, `${templateId}.ejs`);
            const content = fs.readFileSync(filePath, 'utf-8');

            let html;
            if (!weddingWebsite) {
                html = await ejs.render(content, {
                    home: null,
                    about: null,
                    ourStory: null,
                    socialLinks: null,
                    tags: null,
                    eventInfo: null,
                    gallery: null
                });
            } else {
                html = await ejs.render(content, {
                    home: weddingWebsite[0].home,
                    about: weddingWebsite[0].about,
                    ourStory: weddingWebsite[0].ourStory,
                    socialLinks: weddingWebsite[0].socialLinks,
                    tags: weddingWebsite[0].tags,
                    eventInfo: weddingWebsite[0].eventInfo,
                    gallery: weddingWebsite[0].gallery,
                });
            }
            res.status(200).json({ message: 'Password Matched', html });
        } else {
            res.status(401).json({ message: 'Password Not Matched' });
        }
    } catch (err) {
        return res.status(500).json({ message: "Server error. Please try again later." });
    }
}
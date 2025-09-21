import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { mediaService, aiService } from '../services/api';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [story, setStory] = useState('');
    const [socialPosts, setSocialPosts] = useState([]);
    const [loading, setLoading] = useState({
        upload: false,
        story: false,
        social: false
    });
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        artisanName: user?.username || '',
        craftType: ''
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleFileUpload = async (e) => {
        const files = Array.from(e.target.files);

        if (files.length === 0) return;

        if (files.length > 5) {
            setError('Maximum 5 files allowed');
            return;
        }

        setLoading({ ...loading, upload: true });
        setError('');

        try {
            const response = await mediaService.uploadFiles(files);
            if (response.success) {
                setUploadedFiles(response.data);
                setError('');
            } else {
                setError(response.message);
            }
        } catch (err) {
            setError('File upload failed');
        } finally {
            setLoading({ ...loading, upload: false });
        }
    };

    const generateStory = async () => {
        if (!formData.artisanName || !formData.craftType) {
            setError('Please fill in artisan name and craft type');
            return;
        }

        setLoading({ ...loading, story: true });
        setError('');

        try {
            const response = await aiService.generateStory(formData.artisanName, formData.craftType);
            if (response.success) {
                setStory(response.data);
                setError('');
            } else {
                setError(response.message);
            }
        } catch (err) {
            setError('Story generation failed');
        } finally {
            setLoading({ ...loading, story: false });
        }
    };

    const generateSocialPosts = async () => {
        if (!formData.craftType) {
            setError('Please fill in craft type');
            return;
        }

        setLoading({ ...loading, social: true });
        setError('');

        try {
            const response = await aiService.generateSocialPosts(formData.craftType, 'friendly');
            if (response.success) {
                setSocialPosts(Array.isArray(response.data) ? response.data : [response.data]);
                setError('');
            } else {
                setError(response.message);
            }
        } catch (err) {
            setError('Social posts generation failed');
        } finally {
            setLoading({ ...loading, social: false });
        }
    };

    return (
        <div className="min-h-screen p-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-white mb-2">Artisan Dashboard</h1>
                        <p className="text-purple-200">Welcome back, {user?.username}!</p>
                    </div>
                    <button
                        onClick={logout}
                        className="bg-red-500/20 hover:bg-red-500/30 text-red-200 px-4 py-2 rounded-lg border border-red-500/50 transition duration-200"
                    >
                        Logout
                    </button>
                </div>

                {/* Error Display */}
                {error && (
                    <div className="bg-red-500/20 border border-red-500/50 text-red-100 px-4 py-3 rounded-lg mb-6">
                        {error}
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column */}
                    <div className="space-y-8">
                        {/* Artisan Information */}
                        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                            <h2 className="text-2xl font-bold text-white mb-4">Artisan Information</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-purple-200 mb-2">
                                        Artisan Name
                                    </label>
                                    <input
                                        type="text"
                                        name="artisanName"
                                        value={formData.artisanName}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent text-white placeholder-purple-300"
                                        placeholder="Your name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-purple-200 mb-2">
                                        Craft Type
                                    </label>
                                    <input
                                        type="text"
                                        name="craftType"
                                        value={formData.craftType}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent text-white placeholder-purple-300"
                                        placeholder="e.g., Pottery, Weaving, Jewelry"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Photo Upload */}
                        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                            <h2 className="text-2xl font-bold text-white mb-4">Upload Craft Photos</h2>
                            <div className="space-y-4">
                                <div>
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        onChange={handleFileUpload}
                                        disabled={loading.upload}
                                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-purple-500 file:text-white file:cursor-pointer hover:file:bg-purple-600 disabled:opacity-50"
                                    />
                                    <p className="text-sm text-purple-200 mt-2">Upload 3-5 photos of your craft (Max 10MB each)</p>
                                </div>

                                {uploadedFiles.length > 0 && (
                                    <div>
                                        <p className="text-green-300 mb-2">✓ {uploadedFiles.length} files uploaded successfully</p>
                                        <div className="grid grid-cols-2 gap-2">
                                            {uploadedFiles.map((fileName, index) => (
                                                <div key={index} className="bg-green-500/20 text-green-100 px-3 py-2 rounded-lg text-sm">
                                                    {fileName}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* AI Actions */}
                        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                            <h2 className="text-2xl font-bold text-white mb-4">AI Content Generation</h2>
                            <div className="space-y-4">
                                <button
                                    onClick={generateStory}
                                    disabled={loading.story}
                                    className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-3 px-4 rounded-lg hover:from-purple-600 hover:to-indigo-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading.story ? 'Generating Story...' : 'Generate Craft Story'}
                                </button>

                                <button
                                    onClick={generateSocialPosts}
                                    disabled={loading.social}
                                    className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-indigo-600 hover:to-purple-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading.social ? 'Generating Posts...' : 'Generate Social Media Posts'}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-8">
                        {/* Generated Story */}
                        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                            <h2 className="text-2xl font-bold text-white mb-4">Generated Story</h2>
                            {story ? (
                                <div className="bg-white/5 p-4 rounded-lg">
                                    <p className="text-purple-100 leading-relaxed">{story}</p>
                                </div>
                            ) : (
                                <p className="text-purple-300 text-center py-8">
                                    Your AI-generated craft story will appear here
                                </p>
                            )}
                        </div>

                        {/* Social Media Posts */}
                        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                            <h2 className="text-2xl font-bold text-white mb-4">Social Media Posts</h2>
                            {socialPosts.length > 0 ? (
                                <div className="space-y-4 max-h-96 overflow-y-auto">
                                    {socialPosts.map((post, index) => (
                                        <div key={index} className="bg-white/5 p-4 rounded-lg">
                                            <div className="flex justify-between items-start mb-2">
                                                <span className="text-sm text-purple-300">Post {index + 1}</span>
                                                <button
                                                    onClick={() => navigator.clipboard.writeText(post)}
                                                    className="text-xs bg-purple-500/30 hover:bg-purple-500/50 text-purple-200 px-2 py-1 rounded transition duration-200"
                                                >
                                                    Copy
                                                </button>
                                            </div>
                                            <p className="text-purple-100 text-sm whitespace-pre-wrap">{post}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-purple-300 text-center py-8">
                                    Your AI-generated social media posts will appear here
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
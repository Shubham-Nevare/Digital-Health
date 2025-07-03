"use client";

import { useState, useEffect } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const FAQAdmin = () => {
  const [faqs, setFaqs] = useState([]);
  const [totalFaqs, setTotalFaqs] = useState(0);
  const [loading, setLoading] = useState(true);
  const [newFaq, setNewFaq] = useState({ question: "", answer: "" });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/faqs`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setFaqs(data.faqs || []);
      setTotalFaqs(data.total || 0);
    } catch (error) {
      console.error("Error fetching FAQs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddFAQ = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/faqs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newFaq),
      });

      if (response.ok) {
        setNewFaq({ question: "", answer: "" });
        fetchFAQs();
      }
    } catch (error) {
      console.error("Error adding FAQ:", error);
    }
  };

  const handleUpdateFAQ = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const faqToUpdate = faqs.find((faq) => faq._id === id);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/faqs/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(faqToUpdate),
      });

      if (response.ok) {
        setEditingId(null);
        fetchFAQs();
      }
    } catch (error) {
      console.error("Error updating FAQ:", error);
    }
  };

  const handleDeleteFAQ = async (id) => {
    if (!confirm("Are you sure you want to delete this FAQ?")) return;
    
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/faqs/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        fetchFAQs();
      }
    } catch (error) {
      console.error("Error deleting FAQ:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden p-6">
      <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
        FAQ Management
      </h2>

      {/* Add/Edit FAQ Form */}
      <form onSubmit={editingId ? () => handleUpdateFAQ(editingId) : handleAddFAQ} className="mb-8">
        <div className="grid grid-cols-1 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">Question</label>
            <input
              type="text"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={editingId ? faqs.find(f => f._id === editingId).question : newFaq.question}
              onChange={(e) => 
                editingId 
                  ? setFaqs(faqs.map(f => 
                      f._id === editingId ? {...f, question: e.target.value} : f
                    ))
                  : setNewFaq({...newFaq, question: e.target.value})
              }
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Answer</label>
            <textarea
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              value={editingId ? faqs.find(f => f._id === editingId).answer : newFaq.answer}
              onChange={(e) =>
                editingId
                  ? setFaqs(faqs.map(f => 
                      f._id === editingId ? {...f, answer: e.target.value} : f
                    ))
                  : setNewFaq({...newFaq, answer: e.target.value})
              }
              required
            />
          </div>
        </div>
        <div className="flex gap-2">
          {editingId ? (
            <>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
              >
                Update FAQ
              </button>
              <button
                type="button"
                onClick={() => setEditingId(null)}
                className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
            >
              Add FAQ
            </button>
          )}
        </div>
      </form>

      {/* FAQs List */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold mb-4">Existing FAQs <span className="text-gray-400 font-normal">({totalFaqs})</span></h3>
        {faqs.length === 0 ? (
          <p className="text-gray-400">No FAQs found. Add one above.</p>
        ) : (
          faqs.map((faq) => (
            <div key={faq._id} className="border-b border-gray-700 pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-lg font-medium text-white">{faq.question}</h4>
                  <p className="text-gray-300 mt-1">{faq.answer}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditingId(faq._id)}
                    className="text-blue-400 hover:text-blue-300"
                  >
                    <FiEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteFAQ(faq._id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FAQAdmin;
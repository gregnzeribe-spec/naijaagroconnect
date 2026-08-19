import React, { useEffect, useState } from 'react';
import { Newspaper, MapPin, Tag, Sparkles, X, Search } from 'lucide-react';
import { BlogPost, GeopoliticalZone } from '../types';

export const Blog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedZone, setSelectedZone] = useState<string>('All');
  const [openPost, setOpenPost] = useState<BlogPost | null>(null);

  const zones: (GeopoliticalZone | 'All')[] = [
    'All',
    'North-West',
    'North-East',
    'North-Central',
    'South-West',
    'South-East',
    'South-South',
  ];

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const res = await fetch('/api/blogs');
        if (!res.ok) throw new Error('Failed to load posts');
        const data = await res.json();
        setPosts(Array.isArray(data.posts) ? data.posts : []);
      } catch {
        setError('Unable to load farm stories right now. Please try again shortly.');
      } finally {
        setLoading(false);
      }
    };
    loadPosts();
  }, []);

  const filteredPosts = posts
    .filter((p) => selectedZone === 'All' || p.zone === selectedZone)
    .filter(
      (p) =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-[#E5E9D3] shadow-sm">
        <div>
          <div className="flex items-center space-x-2">
            <Newspaper className="w-5 h-5 text-[#588157]" />
            <h2 className="text-2xl font-serif font-bold text-[#3A5A40] tracking-tight">
              Farm Stories & Agro Innovation
            </h2>
          </div>
          <p className="text-sm text-[#588157] mt-1 max-w-2xl">
            Featured farms, cooperatives, and agricultural innovations from across Nigeria's 6 geopolitical zones.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 bg-white p-4 rounded-3xl border border-[#E5E9D3] shadow-sm">
        <div className="md:col-span-4 relative">
          <Search className="w-4 h-4 text-[#588157] absolute left-3 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search stories, tags, farms..."
            className="w-full bg-[#F8F9F1] border border-[#D8E2C3] rounded-xl pl-9 pr-3 py-2 text-xs text-[#2C3327] placeholder-[#A3B18A] focus:outline-none focus:border-[#3A5A40]"
          />
        </div>
        <div className="md:col-span-8 flex items-center space-x-1.5 overflow-x-auto scrollbar-none py-0.5">
          {zones.map((z) => (
            <button
              key={z}
              onClick={() => setSelectedZone(z)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedZone === z
                  ? 'bg-[#3A5A40] text-white shadow-sm font-bold'
                  : 'bg-[#F0F4E8] text-[#588157] hover:bg-[#E5E9D3] border border-[#D8E2C3]'
              }`}
            >
              {z}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-2xl text-sm">{error}</div>
      )}

      {loading ? (
        <div className="text-center py-12 text-[#588157] text-sm">Loading farm stories...</div>
      ) : filteredPosts.length === 0 ? (
        <div className="text-center py-12 text-[#588157] text-sm">No stories match your filters yet.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredPosts.map((post) => (
            <button
              key={post.id}
              onClick={() => setOpenPost(post)}
              className="text-left bg-white border border-[#E5E9D3] hover:border-[#3A5A40] rounded-3xl overflow-hidden shadow-sm transition-all duration-300 hover:-translate-y-1 flex flex-col"
            >
              <img src={post.coverImage} alt={post.title} className="w-full h-40 object-cover" />
              <div className="p-4 space-y-2 flex-1 flex flex-col">
                {post.featured && (
                  <span className="inline-flex items-center w-fit space-x-1 bg-[#F0F4E8] text-[#588157] text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#D8E2C3]">
                    <Sparkles className="w-3 h-3" />
                    <span>Featured</span>
                  </span>
                )}
                <h3 className="font-serif font-bold text-[#3A5A40] text-base leading-snug">{post.title}</h3>
                <p className="text-xs text-[#588157] line-clamp-3 flex-1">{post.excerpt}</p>
                <div className="flex items-center justify-between pt-2 border-t border-[#E5E9D3] text-[10px] text-[#A3B18A]">
                  {post.zone && (
                    <span className="flex items-center">
                      <MapPin className="w-3 h-3 mr-1" />
                      {post.zone}
                    </span>
                  )}
                  <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {openPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white border border-[#E5E9D3] rounded-3xl max-w-2xl w-full shadow-2xl my-8">
            <img src={openPost.coverImage} alt={openPost.title} className="w-full h-56 object-cover rounded-t-3xl" />
            <div className="p-6 space-y-4">
              <div className="flex items-start justify-between">
                <h3 className="text-xl font-serif font-bold text-[#3A5A40] pr-4">{openPost.title}</h3>
                <button onClick={() => setOpenPost(null)} className="text-[#3A5A40] hover:text-[#2C3327] font-bold p-1 shrink-0">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-[11px] text-[#588157]">
                <span>{openPost.authorName}</span>
                {openPost.farmName && (
                  <>
                    <span className="text-[#A3B18A]">•</span>
                    <span>{openPost.farmName}</span>
                  </>
                )}
                {openPost.zone && (
                  <>
                    <span className="text-[#A3B18A]">•</span>
                    <span className="flex items-center">
                      <MapPin className="w-3 h-3 mr-1" />
                      {openPost.zone}
                    </span>
                  </>
                )}
                <span className="text-[#A3B18A]">•</span>
                <span>{new Date(openPost.publishedAt).toLocaleDateString()}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {openPost.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center space-x-1 bg-[#F0F4E8] text-[#588157] text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#D8E2C3]"
                  >
                    <Tag className="w-3 h-3" />
                    <span>{tag}</span>
                  </span>
                ))}
              </div>
              <p className="text-sm text-[#2C3327] whitespace-pre-line leading-relaxed">{openPost.content}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

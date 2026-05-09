"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import styles from "./community.module.css";

// ── helpers ──────────────────────────────────────────────
const TYPE_META = {
  GENERAL: { label: "Post",    color: "#3b82f6", icon: "📸" },
  ADOPT:   { label: "Adopt",   color: "#10b981", icon: "🏠" },
  BUY:     { label: "Buy",     color: "#f59e0b", icon: "🛒" },
  SELL:    { label: "Sell",    color: "#ef4444", icon: "💰" },
};
const ROLE_COLOR = { VET:"#8b5cf6", PET_OWNER:"#06b6d4", FARM_OWNER:"#10b981", ADMIN:"#ef4444", GROOMING:"#ec4899", RETAILER:"#f97316" };
const avatar = (name="?") => name[0].toUpperCase();
const timeAgo = (d) => {
  const s = Math.floor((Date.now()-new Date(d))/1000);
  if(s<60) return `${s}s`;
  if(s<3600) return `${Math.floor(s/60)}m`;
  if(s<86400) return `${Math.floor(s/3600)}h`;
  return `${Math.floor(s/86400)}d`;
};

const SAMPLE_IMAGES = [
  "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&q=80",
  "https://images.unsplash.com/photo-1615789591457-74a63395c990?w=600&q=80",
  "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=600&q=80",
  "https://images.unsplash.com/photo-1548802673-380ab8ebc7b7?w=600&q=80",
  "https://images.unsplash.com/photo-1518288774672-b94e808873ff?w=600&q=80",
  "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600&q=80",
];

const DEMO_POSTS = [
  { _id:"1", authorName:"Priya Sharma", authorRole:"PET_OWNER", caption:"Meet Bruno! 🐕 He's been with us for 3 years and loves long walks. Happy to answer any questions about raising Golden Retrievers! #dogs #pets #goldenretriever", imageUrl:SAMPLE_IMAGES[0], type:"GENERAL", likes:["a","b","c"], comments:[{_id:"c1",authorName:"Raj K",text:"So adorable! 😍",createdAt:new Date()},{_id:"c2",authorName:"Meena",text:"Golden retrievers are the best!",createdAt:new Date()}], createdAt: new Date(Date.now()-7200000) },
  { _id:"2", authorName:"Dr. Arjun Mehta", authorRole:"VET", caption:"🏠 Adoption Alert! Luna is a 2-year-old Indie mix looking for a forever home. Very affectionate, vaccinated & healthy. DM me for details!", imageUrl:SAMPLE_IMAGES[1], type:"ADOPT", petName:"Luna", petType:"Indie Mix Dog", petAge:"2 years", location:"Mumbai, MH", likes:["a","b","c","d","e"], comments:[{_id:"c3",authorName:"Sneha",text:"I'm interested! Sending you a DM",createdAt:new Date()}], createdAt: new Date(Date.now()-18000000) },
  { _id:"3", authorName:"Rohan Patel", authorRole:"PET_OWNER", caption:"💰 Selling: Persian Kitten, 3 months old. All vaccinations done. Very playful and social. Contact for more details. #kitten #persian #forsale", imageUrl:SAMPLE_IMAGES[2], type:"SELL", petName:"Fluffy", petType:"Persian Cat", petAge:"3 months", price:15000, location:"Delhi", likes:["a"], comments:[], createdAt: new Date(Date.now()-86400000) },
  { _id:"4", authorName:"Anita Rao", authorRole:"GROOMING", caption:"Just groomed this gorgeous Siberian Husky today! 😍 Transformation Tuesday at Happy Paws Grooming. Book your appointment now! #grooming #husky", imageUrl:SAMPLE_IMAGES[3], type:"GENERAL", likes:["a","b","c","d","e","f","g"], comments:[{_id:"c4",authorName:"Vikram",text:"Wow what a transformation! 🐺",createdAt:new Date()},{_id:"c5",authorName:"Pooja",text:"Need to bring my husky here!",createdAt:new Date()}], createdAt: new Date(Date.now()-172800000) },
  { _id:"5", authorName:"Rahul Singh", authorRole:"RETAILER", caption:"🛒 Looking to BUY a healthy Labrador puppy. Budget: ₹20,000-30,000. Must be from responsible breeder. Located in Bangalore. DM if you have one!", imageUrl:SAMPLE_IMAGES[4], type:"BUY", petName:"Labrador", petType:"Dog", location:"Bangalore, KA", likes:["a","b"], comments:[{_id:"c6",authorName:"Breeder_Ravi",text:"I have 2 pups available, DM me!",createdAt:new Date()}], createdAt: new Date(Date.now()-259200000) },
  { _id:"6", authorName:"Dr. Kavya Nair", authorRole:"VET", caption:"Health tip 🐾 Always ensure your pets have fresh water available throughout the day, especially in summer. Dehydration is a silent danger. #vettips #pethealth", imageUrl:SAMPLE_IMAGES[5], type:"GENERAL", likes:["a","b","c","d"], comments:[{_id:"c7",authorName:"Suresh",text:"Great advice doctor! Thank you 🙏",createdAt:new Date()}], createdAt: new Date(Date.now()-345600000) },
];

// ── Sub-components ────────────────────────────────────────

function PostCard({ post, currentUserId, onLike, onComment, onDM }) {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [localLikes, setLocalLikes] = useState(post.likes?.length || 0);
  const [liked, setLiked] = useState(post.likes?.includes(currentUserId));
  const [comments, setComments] = useState(post.comments || []);
  const [submitting, setSubmitting] = useState(false);
  const meta = TYPE_META[post.type] || TYPE_META.GENERAL;

  const handleLike = async () => {
    setLiked(p => !p);
    setLocalLikes(p => liked ? p-1 : p+1);
    try {
      const r = await fetch(`/api/community/posts/${post._id}`, { method:"PATCH" });
      const d = await r.json();
      if(d.success) { setLocalLikes(d.likes); setLiked(d.liked); }
    } catch {}
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if(!commentText.trim() || submitting) return;
    setSubmitting(true);
    try {
      const r = await fetch(`/api/community/posts/${post._id}/comments`, {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ text: commentText }),
      });
      const d = await r.json();
      if(d.success) { setComments(p => [...p, d.comment]); setCommentText(""); }
      else setComments(p => [...p, { _id: Date.now(), authorName:"You", text: commentText, createdAt: new Date() }]);
    } catch {
      setComments(p => [...p, { _id: Date.now(), authorName:"You", text: commentText, createdAt: new Date() }]);
    }
    setCommentText("");
    setSubmitting(false);
  };

  return (
    <div className={styles.card}>
      {/* Header */}
      <div className={styles.cardHeader}>
        <div className={styles.avatarWrap} style={{ background: `${ROLE_COLOR[post.authorRole] || "#3b82f6"}25`, border:`1.5px solid ${ROLE_COLOR[post.authorRole] || "#3b82f6"}60` }}>
          <span style={{ color: ROLE_COLOR[post.authorRole] || "#3b82f6", fontWeight:700, fontSize:16 }}>{avatar(post.authorName)}</span>
        </div>
        <div style={{flex:1}}>
          <div className={styles.authorName}>{post.authorName}</div>
          <div className={styles.authorMeta}>
            <span style={{ color: ROLE_COLOR[post.authorRole] || "#6b7280", fontSize:11, fontWeight:600 }}>{post.authorRole?.replace("_"," ")}</span>
            <span style={{color:"#4b5563"}}>·</span>
            <span style={{color:"#4b5563",fontSize:12}}>{timeAgo(post.createdAt)}</span>
          </div>
        </div>
        <div className={styles.typeBadge} style={{ background:`${meta.color}20`, color:meta.color, border:`1px solid ${meta.color}40` }}>
          {meta.icon} {meta.label}
        </div>
      </div>

      {/* Image */}
      {post.imageUrl && (
        <div className={styles.imageWrap}>
          <img src={post.imageUrl} alt="post" className={styles.postImage} onError={e => e.target.style.display="none"} />
        </div>
      )}

      {/* Pet Info */}
      {post.type !== "GENERAL" && (post.petName || post.petType) && (
        <div className={styles.petInfoBar}>
          {post.petName && <span>🐾 <b>{post.petName}</b></span>}
          {post.petType && <span>· {post.petType}</span>}
          {post.petAge && <span>· {post.petAge}</span>}
          {post.price && <span className={styles.price}>₹{post.price.toLocaleString()}</span>}
          {post.location && <span>📍 {post.location}</span>}
        </div>
      )}

      {/* Caption */}
      {post.caption && <p className={styles.caption}>{post.caption}</p>}

      {/* Actions */}
      <div className={styles.actions}>
        <button className={`${styles.actionBtn} ${liked ? styles.liked : ""}`} onClick={handleLike}>
          <span style={{fontSize:18}}>{liked?"❤️":"🤍"}</span>
          <span>{localLikes}</span>
        </button>
        <button className={styles.actionBtn} onClick={() => setShowComments(p=>!p)}>
          <span style={{fontSize:18}}>💬</span>
          <span>{comments.length}</span>
        </button>
        <button className={styles.actionBtn} onClick={() => onDM && onDM(post)}>
          <span style={{fontSize:18}}>✉️</span>
          <span>DM</span>
        </button>
      </div>

      {/* Comments */}
      {showComments && (
        <div className={styles.commentsSection}>
          {comments.map(c => (
            <div key={c._id} className={styles.comment}>
              <div className={styles.commentAvatar}>{avatar(c.authorName||"?")}</div>
              <div>
                <span className={styles.commentAuthor}>{c.authorName}</span>
                <span className={styles.commentText}> {c.text}</span>
                <div className={styles.commentTime}>{timeAgo(c.createdAt)}</div>
              </div>
            </div>
          ))}
          <form onSubmit={handleComment} className={styles.commentForm}>
            <input
              value={commentText} onChange={e=>setCommentText(e.target.value)}
              placeholder="Add a comment..." className={styles.commentInput}
            />
            <button type="submit" className={styles.commentSubmit} disabled={submitting}>Post</button>
          </form>
        </div>
      )}
    </div>
  );
}

function CreatePostModal({ onClose, onPost, user }) {
  const [form, setForm] = useState({ type:"GENERAL", caption:"", imageUrl:"", petName:"", petType:"", petAge:"", price:"", location:"" });
  const [submitting, setSubmitting] = useState(false);
  const set = (k,v) => setForm(p=>({...p,[k]:v}));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!form.caption.trim() && !form.imageUrl.trim()) return;
    setSubmitting(true);
    try {
      const r = await fetch("/api/community/posts", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ ...form, price: form.price ? Number(form.price):undefined, authorName: user?.fullName || "You", authorRole: user?.role }),
      });
      const d = await r.json();
      onPost(d.success ? d.post : { ...form, _id:Date.now(), authorName:user?.fullName||"You", authorRole:user?.role, likes:[], comments:[], createdAt:new Date() });
    } catch {
      onPost({ ...form, _id:Date.now(), authorName:user?.fullName||"You", authorRole:user?.role, likes:[], comments:[], createdAt:new Date() });
    }
    setSubmitting(false);
    onClose();
  };

  const isMarket = form.type !== "GENERAL";
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={e=>e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>Create Post</h3>
          <button onClick={onClose} className={styles.closeBtn}>✕</button>
        </div>
        <form onSubmit={handleSubmit} className={styles.modalBody}>
          {/* Type selector */}
          <div className={styles.typeRow}>
            {Object.entries(TYPE_META).map(([k,v])=>(
              <button key={k} type="button" onClick={()=>set("type",k)} className={styles.typeChip}
                style={{ background:form.type===k?`${v.color}25`:"rgba(255,255,255,0.04)", color:form.type===k?v.color:"#6b7280", border:`1px solid ${form.type===k?v.color+"60":"rgba(255,255,255,0.1)"}` }}>
                {v.icon} {v.label}
              </button>
            ))}
          </div>

          <textarea value={form.caption} onChange={e=>set("caption",e.target.value)} placeholder={isMarket?"Describe the pet, contact info, conditions...":"Share something with the community..."} className={styles.captionInput} rows={4} />
          <input value={form.imageUrl} onChange={e=>set("imageUrl",e.target.value)} placeholder="📷 Image URL (paste link)" className={styles.fieldInput} />

          {isMarket && (
            <div className={styles.marketFields}>
              <input value={form.petName} onChange={e=>set("petName",e.target.value)} placeholder="Pet name" className={styles.fieldInput} />
              <input value={form.petType} onChange={e=>set("petType",e.target.value)} placeholder="Breed / type" className={styles.fieldInput} />
              <input value={form.petAge} onChange={e=>set("petAge",e.target.value)} placeholder="Age" className={styles.fieldInput} />
              {form.type !== "ADOPT" && <input value={form.price} onChange={e=>set("price",e.target.value)} placeholder="Price (₹)" type="number" className={styles.fieldInput} />}
              <input value={form.location} onChange={e=>set("location",e.target.value)} placeholder="📍 Location" className={styles.fieldInput} />
            </div>
          )}

          <button type="submit" disabled={submitting} className={styles.submitBtn}>
            {submitting ? "Posting..." : "Share Post 🚀"}
          </button>
        </form>
      </div>
    </div>
  );
}

function DMPanel({ onClose, targetUser, currentUser }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    if(!targetUser) return;
    fetch(`/api/community/messages?with=${targetUser._id || targetUser.id}`)
      .then(r=>r.json()).then(d=>{ if(d.success) setMessages(d.messages||[]); })
      .catch(()=>{});
  }, [targetUser]);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior:"smooth" }); }, [messages]);

  const send = async (e) => {
    e.preventDefault();
    if(!text.trim()||sending) return;
    setSending(true);
    const opt = { _id:Date.now(), senderId:currentUser?.id, text, createdAt:new Date() };
    setMessages(p=>[...p, opt]);
    setText("");
    try {
      await fetch("/api/community/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({receiverId:targetUser._id||targetUser.id,text:opt.text})});
    } catch {}
    setSending(false);
  };

  return (
    <div className={styles.dmPanel}>
      <div className={styles.dmHeader}>
        <div className={styles.dmAvatar}>{avatar(targetUser?.fullName||targetUser?.authorName||"?")}</div>
        <div>
          <div className={styles.dmName}>{targetUser?.fullName||targetUser?.authorName}</div>
          <div className={styles.dmRole}>{targetUser?.role?.replace("_"," ")}</div>
        </div>
        <button onClick={onClose} className={styles.closeBtn} style={{marginLeft:"auto"}}>✕</button>
      </div>
      <div className={styles.dmMessages}>
        {messages.length===0 && <div className={styles.dmEmpty}>Start a conversation 👋</div>}
        {messages.map(m=>{
          const mine = m.senderId?.toString()===(currentUser?.id||currentUser?._id)?.toString();
          return (
            <div key={m._id} className={`${styles.bubble} ${mine?styles.bubbleMine:styles.bubbleTheirs}`}>
              <span>{m.text}</span>
              <span className={styles.bubbleTime}>{timeAgo(m.createdAt)}</span>
            </div>
          );
        })}
        <div ref={bottomRef}/>
      </div>
      <form onSubmit={send} className={styles.dmInputRow}>
        <input value={text} onChange={e=>setText(e.target.value)} placeholder="Type a message..." className={styles.dmInput} />
        <button type="submit" className={styles.dmSendBtn} disabled={sending}>➤</button>
      </form>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────

export default function CommunityPage() {
  const [posts, setPosts] = useState(DEMO_POSTS);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("ALL");
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [dmTarget, setDmTarget] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState("feed"); // "feed" | "messages"
  const [conversations, setConversations] = useState([]);
  const [activeConv, setActiveConv] = useState(null);
  const [convMessages, setConvMessages] = useState([]);
  const [msgText, setMsgText] = useState("");
  const [msgSending, setMsgSending] = useState(false);
  const msgBottomRef = useRef(null);
  const searchTimeout = useRef(null);

  // Fetch current user
  useEffect(() => {
    fetch("/api/me").then(r=>r.json()).then(d=>{ if(d.success) setCurrentUser(d.user); }).catch(()=>{});
  }, []);

  // Load conversations when messages tab opened
  useEffect(() => {
    if(activeTab !== "messages") return;
    fetch("/api/community/messages")
      .then(r=>r.json())
      .then(d=>{ if(d.success) setConversations(d.conversations||[]); })
      .catch(()=>{});
  }, [activeTab]);

  // Load messages for active conversation
  useEffect(() => {
    if(!activeConv) return;
    const id = activeConv.user?._id || activeConv.user?.id || activeConv._id;
    fetch(`/api/community/messages?with=${id}`)
      .then(r=>r.json())
      .then(d=>{ if(d.success) setConvMessages(d.messages||[]); })
      .catch(()=>{});
  }, [activeConv]);

  useEffect(() => { msgBottomRef.current?.scrollIntoView({ behavior:"smooth" }); }, [convMessages]);

  const sendMsg = async (e) => {
    e.preventDefault();
    if(!msgText.trim() || msgSending || !activeConv) return;
    setMsgSending(true);
    const t = msgText; setMsgText("");
    const opt = { _id: Date.now(), senderId: currentUser?._id, text: t, createdAt: new Date() };
    setConvMessages(p => [...p, opt]);
    try {
      const rid = activeConv.user?._id || activeConv._id;
      await fetch("/api/community/messages", { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({ receiverId: rid, text: t }) });
    } catch {}
    setMsgSending(false);
  };

  const openDM = (target) => {
    setActiveConv({ user: target });
    setConvMessages([]);
    setActiveTab("messages");
  };

  // Fetch posts from API (merge with demos)
  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams({ type:filter });
    if(search) params.set("search", search);
    fetch(`/api/community/posts?${params}`)
      .then(r=>r.json())
      .then(d=>{ if(d.success && d.posts.length>0) setPosts(d.posts); else setPosts(DEMO_POSTS); })
      .catch(()=>setPosts(DEMO_POSTS))
      .finally(()=>setLoading(false));
  }, [filter, search]);

  // Search users
  const handleSearch = (q) => {
    setSearch(q);
    clearTimeout(searchTimeout.current);
    if(!q.trim()) { setSearchResults([]); return; }
    searchTimeout.current = setTimeout(async()=>{
      try {
        const r = await fetch(`/api/community/search?q=${encodeURIComponent(q)}`);
        const d = await r.json();
        setSearchResults(d.users||[]);
      } catch {}
    }, 350);
  };

  const onNewPost = (post) => setPosts(p=>[post,...p]);

  const filteredPosts = filter==="ALL" ? posts : posts.filter(p=>p.type===filter);
  const displayPosts = search
    ? filteredPosts.filter(p=> p.caption?.toLowerCase().includes(search.toLowerCase()) || p.petName?.toLowerCase().includes(search.toLowerCase()) || p.authorName?.toLowerCase().includes(search.toLowerCase()))
    : filteredPosts;

  // Messages inbox view
  const MessagesView = () => (
    <div className={styles.messagesLayout} data-active={!!activeConv}>
      {/* Conversation list */}
      <div className={styles.convList}>
        <div className={styles.convListHeader}>
          <span style={{color:"#f1f5f9",fontWeight:700,fontSize:16}}>💬 Messages</span>
          <button onClick={()=>setActiveConv(null)} style={{background:"none",border:"none",color:"#6b7280",fontSize:12,cursor:"pointer"}}>+ New</button>
        </div>
        {conversations.length===0 ? (
          <div style={{padding:"32px 16px",textAlign:"center",color:"#4b5563"}}>
            <div style={{fontSize:32,marginBottom:8}}>✉️</div>
            <div style={{fontSize:13}}>No conversations yet.</div>
            <div style={{fontSize:12,marginTop:4}}>Search for a user and click DM!</div>
          </div>
        ) : conversations.map((c,i)=>(
          <div key={i} onClick={()=>{setActiveConv(c);setConvMessages([]);}} className={`${styles.convItem} ${activeConv===c?styles.convItemActive:""}`}>
            <div className={styles.convAvatar}>{avatar(c.user?.fullName||"?")}</div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{color:"#f1f5f9",fontWeight:600,fontSize:13}}>{c.user?.fullName}</div>
              <div style={{color:"#6b7280",fontSize:11,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{c.lastMessage?.text}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Chat area */}
      <div className={styles.chatArea}>
        {!activeConv ? (
          <div className={styles.chatEmpty}>
            <div style={{fontSize:56}}>💬</div>
            <div style={{color:"#6b7280",fontSize:18,fontWeight:600,marginTop:12}}>Select a conversation</div>
            <div style={{color:"#4b5563",fontSize:13,marginTop:6}}>Or search for a user and click DM to start chatting</div>
          </div>
        ) : (
          <>
            <div className={styles.chatHeader}>
              <button onClick={()=>setActiveConv(null)} className={styles.backBtn}>←</button>
              <div className={styles.chatAvatar}>{avatar(activeConv.user?.fullName||activeConv.user?.authorName||"?")}</div>
              <div>
                <div style={{color:"#f1f5f9",fontWeight:700,fontSize:14}}>{activeConv.user?.fullName||activeConv.user?.authorName}</div>
                <div style={{color:"#6b7280",fontSize:11}}>{activeConv.user?.role?.replace("_"," ")}</div>
              </div>
            </div>
            <div className={styles.chatMessages}>
              {convMessages.length===0 && <div className={styles.dmEmpty}>Say hello 👋</div>}
              {convMessages.map(m=>{
                const mine = m.senderId?.toString()===(currentUser?._id||currentUser?.id)?.toString();
                return (
                  <div key={m._id} className={`${styles.bubble} ${mine?styles.bubbleMine:styles.bubbleTheirs}`}>
                    <span>{m.text}</span>
                    <span className={styles.bubbleTime}>{timeAgo(m.createdAt)}</span>
                  </div>
                );
              })}
              <div ref={msgBottomRef}/>
            </div>
            <form onSubmit={sendMsg} className={styles.chatInputRow}>
              <input value={msgText} onChange={e=>setMsgText(e.target.value)} placeholder="Type a message..." className={styles.dmInput} autoFocus/>
              <button type="submit" className={styles.dmSendBtn} disabled={msgSending}>➤</button>
            </form>
          </>
        )}
      </div>
    </div>
  );

  return (
    <div className={styles.page} data-tab={activeTab}>
      {/* Left sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarBrand}>
          <span style={{fontSize:24}}>🐾</span>
          <span className={styles.brandText}>VetEra Community</span>
        </div>

        {/* Tab switcher */}
        <div className={styles.tabRow}>
          <button onClick={()=>setActiveTab("feed")} className={`${styles.tabBtn} ${activeTab==="feed"?styles.tabBtnActive:""}`}>📸 Feed</button>
          <button onClick={()=>setActiveTab("messages")} className={`${styles.tabBtn} ${activeTab==="messages"?styles.tabBtnActive:""}`}>💬 Messages</button>
        </div>

        {/* Search */}
        <div className={styles.searchWrap}>
          <input
            value={search} onChange={e=>handleSearch(e.target.value)}
            placeholder="🔍 Search posts, pets, people..."
            className={styles.searchInput}
          />
          {searchResults.length>0 && (
            <div className={styles.searchDropdown}>
              {searchResults.map(u=>(
                <div key={u._id} className={styles.searchResult} onClick={()=>{setDmTarget(u);setSearchResults([]);setSearch("");}}>
                  <div className={styles.searchAvatar} style={{background:`${ROLE_COLOR[u.role]||"#3b82f6"}20`,color:ROLE_COLOR[u.role]||"#3b82f6"}}>{avatar(u.fullName)}</div>
                  <div>
                    <div style={{color:"#f1f5f9",fontSize:13,fontWeight:600}}>{u.fullName}</div>
                    <div style={{color:"#6b7280",fontSize:11}}>{u.role?.replace("_"," ")} {u.city?`· ${u.city}`:""}</div>
                  </div>
                  <span style={{marginLeft:"auto",color:"#3b82f6",fontSize:11}}>DM →</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Filters */}
        <div className={styles.filterList}>
          <div className={styles.filterLabel}>Browse</div>
          {[["ALL","🌐","All Posts"],["GENERAL","📸","General"],["ADOPT","🏠","Adopt"],["BUY","🛒","Buy"],["SELL","💰","Sell"]].map(([k,icon,label])=>(
            <button key={k} onClick={()=>setFilter(k)} className={`${styles.filterItem} ${filter===k?styles.filterActive:""}`}
              style={filter===k?{background:`${TYPE_META[k]?.color||"#3b82f6"}18`,color:TYPE_META[k]?.color||"#3b82f6",borderColor:`${TYPE_META[k]?.color||"#3b82f6"}50`}:{}}>
              <span>{icon}</span> {label}
            </button>
          ))}
        </div>

        {/* Create CTA */}
        <button onClick={()=>setShowCreate(true)} className={styles.createBtn}>
          + Create Post
        </button>

        {/* Tips */}
        <div className={styles.tipsCard}>
          <div className={styles.tipsTitle}>Community Tips</div>
          <div className={styles.tip}>🏠 <b>Adopt</b> — Find pets needing a home</div>
          <div className={styles.tip}>🛒 <b>Buy</b> — Post what you&apos;re looking for</div>
          <div className={styles.tip}>💰 <b>Sell</b> — List pets responsibly</div>
          <div className={styles.tip}>💬 <b>DM</b> — Connect privately with sellers</div>
        </div>
      </aside>

      {/* Main area — feed or messages */}
      <main className={styles.feed}>
        {activeTab==="messages" ? <MessagesView /> : (
          <>
            {/* Mobile header */}
            <div className={styles.mobileHeader}>
              <span style={{fontSize:22}}>🐾</span>
              <span style={{color:"#f1f5f9",fontWeight:700,fontSize:18}}>Community</span>
              <div style={{display:"flex",gap:8,marginLeft:"auto"}}>
                <button onClick={()=>setActiveTab("messages")} style={{background:"rgba(59,130,246,0.15)",border:"1px solid rgba(59,130,246,0.3)",borderRadius:"50%",width:34,height:34,color:"#93c5fd",cursor:"pointer",fontSize:16}}>💬</button>
                <button onClick={()=>setShowCreate(true)} className={styles.mobileCreateBtn}>+</button>
              </div>
            </div>

            {/* Filter pills (mobile) */}
            <div className={styles.mobilePills}>
              {[["ALL","🌐"],["ADOPT","🏠"],["BUY","🛒"],["SELL","💰"],["GENERAL","📸"]].map(([k,icon])=>(
                <button key={k} onClick={()=>setFilter(k)} className={`${styles.pill} ${filter===k?styles.pillActive:""}`}
                  style={filter===k?{background:`${TYPE_META[k]?.color||"#3b82f6"}25`,color:TYPE_META[k]?.color||"#3b82f6",borderColor:`${TYPE_META[k]?.color||"#3b82f6"}60`}:{}}>
                  {icon} {k==="ALL"?"All":k}
                </button>
              ))}
            </div>

            {loading ? (
              <div className={styles.loadingWrap}>
                {[1,2,3].map(i=><div key={i} className={styles.skeleton}/>)}
              </div>
            ) : displayPosts.length===0 ? (
              <div className={styles.empty}>
                <div style={{fontSize:64}}>🐾</div>
                <div style={{color:"#6b7280",fontSize:18,fontWeight:600}}>No posts yet</div>
                <div style={{color:"#4b5563",fontSize:14,marginTop:8}}>Be the first to post in this community!</div>
                <button onClick={()=>setShowCreate(true)} className={styles.createBtn} style={{marginTop:20}}>Create Post</button>
              </div>
            ) : (
              displayPosts.map(post=>(
                <PostCard key={post._id} post={post} currentUserId={currentUser?._id||currentUser?.id}
                  onDM={(p)=>openDM({ fullName:p.authorName, role:p.authorRole, _id:p.authorId||p._id })}
                />
              ))
            )}
          </>
        )}
      </main>

      {/* Right panel */}
      <aside className={styles.rightPanel}>
        <div className={styles.rightCard}>
          <div className={styles.rightTitle}>Market</div>
          {[["🏠","Adoptions","ADOPT"],["💰","For Sale","SELL"],["🛒","Wanted","BUY"]].map(([icon,label,type])=>(
            <button key={type} onClick={()=>setFilter(type)} className={styles.marketItem}>
              <span style={{fontSize:20}}>{icon}</span>
              <div>
                <div style={{color:"#e2e8f0",fontSize:13,fontWeight:600}}>{label}</div>
                <div style={{color:"#6b7280",fontSize:11}}>{posts.filter(p=>p.type===type).length} listings</div>
              </div>
            </button>
          ))}
        </div>
        <div className={styles.rightCard}>
          <div className={styles.rightTitle}>Community Stats</div>
          <div className={styles.stat}><span>📝</span><span style={{color:"#e2e8f0"}}>{posts.length} posts</span></div>
          <div className={styles.stat}><span>❤️</span><span style={{color:"#e2e8f0"}}>{posts.reduce((s,p)=>s+(p.likes?.length||0),0)} likes</span></div>
          <div className={styles.stat}><span>💬</span><span style={{color:"#e2e8f0"}}>{posts.reduce((s,p)=>s+(p.comments?.length||0),0)} comments</span></div>
        </div>
      </aside>

      {/* Modals */}
      {showCreate && <CreatePostModal onClose={()=>setShowCreate(false)} onPost={onNewPost} user={currentUser} />}
    </div>
  );
}

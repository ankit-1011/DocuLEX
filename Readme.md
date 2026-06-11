High impact (pehle yeh karo)
Smart contract upload flow complete karo
contract.ts mein uploadDocument hai, lekin upload ke baad blockchain par register nahi ho raha. Upload success ke baad CID + filename chain par likho aur tx hash UI par dikhao.

AI document summarization (Sarvam)
SkipTemplate mein "Summarise" button ab dummy hai. PDF/text extract karke sarvam.ts se summary API banao — yeh landing page ke "AI-powered insights" claim se match karega.

Upload ke baad list auto-refresh
Ab upload ke baad dashboard dubara fetch nahi karta. UploadFile se onUploaded callback se cards turant update ho sakte hain.

Logout + session handling
Token/email clear karo, expired JWT par auto redirect /auth, proper logout button navbar mein.

Search actually kaam kare
Dashboard par search input hai par filter logic nahi. Filename / CID / date se filter add karo.

created_at column DB mein
UI doc.created_at dikhata hai; agar DB mein column nahi hai to Invalid Date aayega. Migration + backend insert fix karo.

Security & verification (DocuLEX ka core USP)
Document verification page
Public URL: /verify/:cid — koi bhi CID daale to file hash, upload date, owner wallet, blockchain tx verify ho.

SHA-256 hash store karo
Upload par file ka cryptographic hash DB + chain par save karo. Baad mein "tampered or original?" check ho sake.

Digital signature / wallet sign message
Upload se pehle user apne wallet se message sign kare — proof ki file usi ne upload ki.

Share link with expiry
Time-limited shareable link (e.g. 24 hours) taaki lawyer/client ko document bhej sako bina full account ke.

UX improvements
In-app PDF preview
Ab preview naya tab kholta hai. Modal ke andar PDF viewer (react-pdf) better UX dega.

Dark / light mode
Sun/Moon icons hain par toggle logic nahi. Theme switch + localStorage.

Empty & loading states
"No documents", skeleton loaders, wallet connect na ho to clear message.

Toast errors improve karo
Backend se exact message dikhao (User not found, Document already stored, etc.).

Document delete
DELETE /api/docs/:cid — DB se hatao (IPFS immutable rehta hai, yeh clear karo UI mein).

Rename / tags / categories
Legal docs ke liye: Contract, Affidavit, Court Order, etc.

Blockchain & Web3 (landing page ke claims)
On-chain document list read karo
Contract ka getDocuments() wagmi/ethers se dashboard par "Blockchain verified" badge ke saath dikhao.

Transaction history panel
Har document ke liye: Pinata CID, DB save time, blockchain tx hash, block timestamp.

Multi-chain support
Ab ek hardcoded contract address hai. Testnet/mainnet switch + env-based config.

NFT-style proof (optional)
Har document ka ownership proof ERC-721 token — advanced, demo ke liye strong.

AI features (Sarvam integrate karke)
Key clause extraction
Contract se parties, dates, amounts, obligations nikalna.

Multi-language summary
Hindi + English summary — Indian legal docs ke liye useful.

Q&A on document
"Is agreement mein notice period kya hai?" — RAG style chat over uploaded PDF.

OCR for scanned PDFs/images
Scanned documents se text nikal kar search/summary enable karo.

Advanced (portfolio / hackathon level)
Zero-Knowledge proof verification
Landing par ZK mention hai — prove karo "document valid hai" bina poori file reveal kiye (zkSNARK library).

DAO governance module
Community document registry approve/reject — governance token + voting.

Audit trail / activity log
Kaun ne kab upload/download/preview kiya — compliance ke liye.

Role-based access
Admin, Lawyer, Client roles — alag permissions.

Email notifications
Upload success, share link, verification alert.

Admin dashboard
Total users, documents, storage stats, flagged docs.

Code quality & production
Env-based API URL
localhost:3000 hardcoded hai — .env se VITE_API_URL.

Backend validation (Zod/Joi)
Request body validate karo signup/upload/docs par.

Pagination
Documents zyada hone par GET /api/docs?page=1&limit=10.

File type & size limits
Sirf PDF/DOCX, max 10MB — security.

Tests
Auth, upload, docs API ke liye unit + integration tests.
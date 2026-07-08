High impact (pehle yeh karo)
Smart contract upload flow complete karo
contract.ts mein uploadDocument hai, lekin upload ke baad blockchain par register nahi ho raha. Upload success ke baad CID + filename chain par likho aur tx hash UI par dikhao.

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

Rename / tags / categories
Legal docs ke liye: Contract, Affidavit, Court Order, etc

Role-based access
Admin, Lawyer, Client roles — alag permissions.

Admin dashboard
Total users, documents, storage stats, flagged docs.

Backend validation (Zod/Joi)
Request body validate karo signup/upload/docs par

Tests
Auth, upload, docs API ke liye unit + integration tests
-----------------------------------------------------------
Pagination
Documents zyada hone par GET /api/docs?page=1&limit=10.

UX improvements
In-app PDF preview
Ab preview naya tab kholta hai. Modal ke andar PDF viewer (react-pdf) better UX dega.

Share link with expiry
Time-limited shareable link (e.g. 24 hours) taaki lawyer/client ko document bhej sako bina full account ke.







AI document summarization (Sarvam)
SkipTemplate mein "Summarise" button ab dummy hai. PDF/text extract karke sarvam.ts se summary API banao — yeh landing page ke "AI-powered insights" claim se match karega

AI features (Sarvam integrate karke)
Key clause extraction
Contract se parties, dates, amounts, obligations nikalna.

Multi-language summary
Hindi + English summary — Indian legal docs ke liye useful.

Q&A on document
"Is agreement mein notice period kya hai?" — RAG style chat over uploaded PDF

OCR for scanned PDFs/images
Scanned documents se text nikal kar search/summary enable karo.

# SpinMaster TT: share the app and invite your players

Your players need two things: **the app** and **a code that links them to their profile**. This setup gives you both in one invite.

---

## Part 1: Upload the new files (once)

In your GitHub repo click **Add file → Upload files** and drag in these **8 files**, then **Commit changes**:

| File | What it is |
|---|---|
| `index.html` | the app |
| `style.css` | the styles |
| `manifest.json` | makes the web version installable like an app |
| `service-worker.js` | lets the web version work offline |
| `icon-192.png`, `icon-512.png`, `icon-maskable-512.png`, `apple-touch-icon.png` | the app icon |

**Do not upload** `firebase-config.js` or `google-services.json` again. Yours already hold your real settings.

### Replace the build recipe
1. Open `.github/workflows/build-apk.yml` → click the **pencil icon**.
2. Select all (Ctrl+A), paste the contents of the new **`build-apk.yml`**, then **Commit changes**.

This new version also publishes the Android app to a **public download page** after every build.

## Part 2: Check three things (5 minutes, once)

1. **GitHub Pages is on** (it already is). Your web app is at
   `https://kaushikg183.github.io/spinmaster-tt/`
2. **Firebase allows the web address.** Firebase → **Authentication → Settings → Authorized domains → Add domain** → type `kaushikg183.github.io` → Add.
3. **The build may publish releases.** After the next green ✅ in **Actions**, open your repo's main page. On the right you should see **Releases** with *"SpinMaster TT, newest Android app"*.
   If the build fails at the last step with *"Resource not accessible by integration"*: **Settings → Actions → General → Workflow permissions → Read and write permissions → Save**, then re-run the build.

Your public Android download link is:
`https://github.com/kaushikg183/spinmaster-tt/releases/latest/download/SpinMaster-TT.apk`
(Test it in a private/incognito window: it must download without asking you to log in.)

## Part 3: Invite a player

1. Open the app → **Club tab → Members & invites** → tap **Invite** next to the player.
2. Tap **Share on WhatsApp** (or **Copy invite**). The message contains:
   - the **web link with the code inside it**,
   - the **Android download link**,
   - three short steps.
3. **Keep your app open for a moment** when they join. It approves them automatically.

## What your player does

**On any phone (Android or iPhone), no download:**
1. Opens the link from WhatsApp.
2. A purple banner says *"You are invited to join a club"*. Tap **Create account** and sign up with an email.
3. Tap **Join now**. The code is already filled in.
4. They land on the **Club** tab with their own profile card.
5. Optional: Chrome menu **⋮ → Install app**, or on iPhone Safari **Share → Add to Home Screen**. It then opens like a normal app.

**With the Android app:** open the download link, install (allow *Install unknown apps* if asked), create an account, tap the circle icon, find **Club**, and enter the code from the invite.

## Good to know
- Each code works **once** and only for that player.
- Players see the whole club (rankings, matches, tournaments) but **cannot change anything**.
- You are still the only scorer. New matches reach players a few seconds after you finish them.
- **Updates:** the web app updates by itself the next time it is opened with internet. The Android app updates when a player installs the newest APK from the same download link (it installs over the old one and keeps their data).
- The Android app must be installed the first time via the download link. Android will show a Play Protect warning for apps from outside the Play Store. That is normal.

## If something is wrong
| What you see | Fix |
|---|---|
| The invite link shows a blank page | Wait 2 minutes after uploading (GitHub is updating), then reload |
| "This invite was already used or cancelled" | Invite the player again to get a fresh code |
| Join request stays "waiting" | Open the owner's app and keep it open for a minute |
| "Club features need the new database rules" | Paste `firestore.rules` into Firebase → Firestore → Rules → Publish |
| No Releases section on GitHub | The last build step failed. Check **Actions** and the permission fix in Part 2 |
| Chrome shows no Install option | Open the web link, use it for a minute, reload, then try the ⋮ menu again |

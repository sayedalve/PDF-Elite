Continue the PDF Elite redesign using the provided `pdf-viewer-ui-ux-skill.md` as the design skill and the reference screenshots provided with this request.



This is a MAJOR UI/UX reconstruction.



The current application is better than before, but it is still far from a world class professional PDF application.



Do not make another small visual pass.



Do not simply change CSS values.



Do not simply move existing components.



The current UI needs a substantial restructuring so that PDF Elite feels like professional desktop PDF software.



The screenshots show the current PDF Elite interface and the professional reference interface.



Use the references to understand:



• hierarchy

• layout

• spacing

• density

• toolbar organization

• icon quality

• navigation

• document focus

• contextual controls

• visual polish



Do not copy proprietary branding or exact assets.



PDF Elite must remain its own product.



==================================================

0\. VERY IMPORTANT: USE THE SKILL FILE CORRECTLY

==================================================



The provided:



`pdf-viewer-ui-ux-skill.md`



is the design skill.



Read it completely before implementation.



Do not create a second generic UI/UX system.



Do not replace the skill with your own simplified interpretation.



Use it as the design intelligence for this project.



The application itself is a desktop PDF reader/editor product, so all decisions must be specialized to that context.



==================================================

1\. THIS IS NOT A SMALL REDESIGN

==================================================



The current result is still too basic.



The visual difference from the previous PDF Elite UI is not large enough.



The target is professional desktop PDF application quality.



The finished result should make the user immediately feel:



"This is a serious PDF application."



Not:



"This is a React app with PDF tools."



Not:



"This is a Stirling PDF UI with different colors."



Not:



"This is a tool catalogue."



Do not stop after superficial changes.



==================================================

2\. FIRST: INSPECT THE CURRENT APPLICATION

==================================================



Before editing anything, inspect the actual current implementation.



Identify:



• application shell

• home page

• file open flow

• recent documents

• tool catalogue

• viewer

• document tabs

• left navigation

• right navigation

• top toolbar

• bottom controls

• page navigation

• zoom

• search

• editing

• annotation

• comments

• page organization

• settings

• branding

• logos

• icons

• Stirling specific UI

• cloud UI

• sign in UI

• mobile upload UI

• Google Drive UI

• backend dependent UI

• active files UI



Trace where each visible element actually comes from.



Do not delete components before understanding what depends on them.



Do not break working functionality simply because a component looks unnecessary.



==================================================

3\. HOME PAGE MUST BE REBUILT VISUALLY

==================================================



The current home page still looks unfinished.



The main problem is that content is concentrated in the middle while large parts of the window are unused.



The professional reference uses the entire window much more effectively.



The PDF Elite home page should follow this general composition:



┌──────────────────────────────────────────────────────┐

│ top application chrome                               │

├───────────┬──────────────────────────────────────────┤

│ left      │                                          │

│ navigation│      main document home workspace        │

│           │                                          │

│           │      primary actions                     │

│           │      recent documents                    │

│           │      secondary document actions          │

│           │                                          │

└───────────┴──────────────────────────────────────────┘



The exact implementation can differ, but the composition must feel intentional.



==================================================

4\. HOME LEFT SIDEBAR

==================================================



The current PDF Elite home sidebar is too generic and not useful enough.



It should be redesigned based on the professional reference.



The left side should provide meaningful document navigation.



Use concepts such as:



Home



Recent Files



Starred / Favorites where already supported



Recent Folders where already supported



Document browsing



Only expose functionality that actually exists.



Do not put unrelated viewer tools in the home navigation.



Do not use the old Stirling style file browser layout.



Do not show unnecessary:



Search



Google Drive



Cloud



Mobile upload



Sign in



unless those functions genuinely remain part of PDF Elite.



==================================================

5\. REMOVE STIRLING DEAD UI

==================================================



This application is intended to be a fully offline PDF application.



The following Stirling related or cloud dependent UI must be investigated and removed from the PDF Elite user experience where it is dead or unsupported:



• Google Drive

• mobile upload

• cloud upload

• sign in

• cloud account controls

• cloud storage references

• online account requirements

• unnecessary Stirling account messaging



For example, clicking Open File currently exposes Google Drive and mobile upload related options.



That is not appropriate for this offline application.



Remove these paths properly.



Do NOT simply hide them with CSS.



Trace their components and state.



Remove them in a way that does not break:



• normal file picker

• PDF opening

• recent documents

• desktop file handling

• existing local storage



Do not delete shared code blindly.



Determine dependencies first.



==================================================

6\. NO SIGN IN FOR CORE OFFLINE VIEWER

==================================================



PDF Elite must not make the user feel that signing in is necessary.



The core application must work completely offline.



Remove misleading:



"Sign in to unlock"



"Cloud"



"Account"



"Upload to mobile"



and similar UI from the main PDF workflow if those functions are not part of the actual product.



Do not replace them with fake buttons.



==================================================

7\. QUICK TOOLS ON HOME

==================================================



The current Quick Tools section is too small and visually weak.



It looks like a list placed inside a large empty area.



That is not professional.



The Quick Tools area should become a structured professional section.



Use a layout similar in visual quality to the reference:



Multiple columns.



Clear icons.



Clear title.



Short description.



Strong hierarchy.



Balanced spacing.



Enough content across the available width.



Do not stack everything into one narrow vertical list.



Do not use enormous cards.



Do not make every tool visually identical in importance.



Prioritize the most common tools.



Use existing tools only.



==================================================

8\. HOME PAGE WIDTH

==================================================



Do not keep all meaningful content constrained to a small centered column.



The main content should use the available desktop width intelligently.



The layout should breathe.



On a large screen:



• primary actions use a reasonable area

• recent documents use meaningful width

• quick tools use multiple columns

• unused space is minimized



Do not stretch content blindly from edge to edge either.



Use a professional maximum content width and responsive margins.



The result should visually resemble a mature desktop application.



==================================================

9\. HOME TYPOGRAPHY

==================================================



The current typography looks amateur.



Perform a complete typography audit.



Fix:



• inconsistent font sizes

• inconsistent weights

• poor hierarchy

• weak secondary text

• awkward headings

• excessive uppercase labels

• tiny metadata

• inconsistent line heights

• inconsistent icon/text alignment



Use a deliberate typography hierarchy.



The page title should be clear.



Section headings should be clear.



Tool titles should be readable.



Descriptions should be secondary.



Metadata should remain subtle but readable.



Do not use childish or decorative typography.



==================================================

10\. ICON SYSTEM

==================================================



The current icons are one of the weakest parts of the UI.



They look small, generic, and inconsistent.



Replace the visible application UI icons with a coherent professional icon language.



Use an existing high quality icon family that fits the codebase.



Do not use random icon libraries from different styles.



Do not use emoji.



Do not make icons tiny.



Do not make icons excessively large.



Use:



• consistent stroke

• consistent visual weight

• consistent optical size

• consistent padding

• consistent alignment



Primary navigation icons should be larger than secondary icons.



Toolbar icons should have comfortable click targets.



The icons must look intentional.



==================================================

11\. BRANDING REWORK

==================================================



Rebranding is required.



The application should be clearly branded as:



PDF Elite



not Stirling.



However, this is a HIGH RISK area because the existing application is deeply based on Stirling and some branding may be referenced by code, assets, package metadata, runtime behavior, licensing, or build configuration.



Therefore:



DO NOT perform a blind global search and replace.



DO NOT rename every occurrence of "Stirling" automatically.



DO NOT break backend identifiers.



DO NOT rename internal package names just for visual branding.



DO NOT modify API paths blindly.



DO NOT break runtime dependencies.



Instead:



First map branding usage.



Classify each occurrence as:



1\. User visible branding

2\. Internal technical identifier

3\. Backend dependency

4\. Package/module name

5\. Asset

6\. Documentation

7\. Build identifier

8\. Legal/license reference



Only replace user visible branding where safe and appropriate.



The visible desktop product should display:



PDF Elite



in:



• application title

• home branding

• viewer branding where appropriate

• application icon

• installer-facing branding where safely supported

• visible about/help surfaces where appropriate



Keep technical Stirling identifiers where changing them could break functionality.



==================================================

12\. NEW PDF ELITE ICON

==================================================



A new PDF Elite application icon is required.



The icon must be professional.



Use a clean modern document/PDF related visual concept.



Primary brand accent:



Blue



The icon should work at:



• desktop shortcut size

• taskbar size

• title bar size

• installer size



Do not reuse the Stirling logo.



Do not use a simple generic PDF icon from the internet.



Create a distinct PDF Elite identity.



Before changing packaging:



inspect how the current icon is referenced.



Update branding safely without breaking Tauri or packaging.



==================================================

13\. BLUE ACCENT IS REQUIRED

==================================================



PDF Elite must have a consistent blue accent system.



Use the previously established blue accent:



`#79AEFF`



as the primary interface accent unless the existing design system has a safer derived implementation.



Use it for:



• active navigation

• active tabs

• focus

• selected controls

• primary interactive states

• selection indicators

• important viewer controls



Do not make the entire interface blue.



Blue should communicate focus and action.



==================================================

14\. OPEN FILE FLOW

==================================================



The Open PDF workflow must be simplified.



The primary action should be:



Open PDF



Clicking it should lead naturally to the local Windows file picker.



There should not be a giant web style file selection workflow.



Remove dead integrations such as:



Google Drive



mobile upload



cloud import



when they are not part of the offline product.



The normal local file workflow must remain fully functional.



==================================================

15\. DOCUMENT WORKSPACE

==================================================



When a PDF is open, the home UI should disappear.



The user should enter a dedicated PDF workspace.



The structure should resemble a premium desktop document application.



Use:



• document tabs

• compact top toolbar

• left mode/navigation rail

• large central PDF

• right utility area

• compact integrated page/zoom controls



Do not turn it into a three column dashboard.



The PDF must dominate.



==================================================

16\. BOTTOM CONTROL BAR MUST CHANGE

==================================================



The current large bottom floating bar consumes useful document space.



Do not keep the current large centered floating control bar.



Move its useful functions into a more appropriate viewer location.



Preferably integrate:



• page number

• total pages

• zoom

• fit page

• fit width

• page navigation



into a compact right-side viewer control area or another professional integrated location.



The bottom of the document should remain mostly open.



Do not allow controls to cover important document text.



==================================================

17\. LEFT VIEWER RAIL

==================================================



The left rail inside the document workspace should represent major viewer functions.



Use existing functions only.



It can include modes such as:



View



Comment



Edit



Organize



and other existing major viewer modes.



However, the icons must be:



• larger

• clearer

• properly spaced

• visually consistent

• professionally selected



Do not make them tiny.



The active item needs a strong but subtle blue selected state.



==================================================

18\. TOP CONTEXTUAL TOOLBAR

==================================================



This is a major requirement.



Clicking a major mode on the left should change the top toolbar.



For example:



Click:



View



Top toolbar shows:



• page view

• zoom

• fit modes

• rotate

• fullscreen

• other viewer functions



Click:



Comment



Top toolbar shows:



• comment

• sticky note

• highlight

• underline

• strikethrough

• text box

• drawing/pen where supported

• color/settings where supported



Click:



Edit



Top toolbar shows the existing editing functions.



Click:



Organize



Top toolbar shows PAGE ORGANIZATION tools.



Do not make the top toolbar show only one or two commands when the application already has many related capabilities.



The goal is progressive disclosure:



Major category



→ contextual toolbar



→ relevant sub-options.



==================================================

19\. ORGANIZE MUST BE A REAL PAGE MANAGEMENT MODE

==================================================



The current Organize mode appears to expose only Rotate.



That is insufficient.



If existing functionality supports:



• thumbnails

• reorder

• rotate

• delete

• extract

• replace

• insert

• split

• page selection

• page movement



then Organize should expose those capabilities through a professional page management interface.



Use a thumbnail driven page organizer where appropriate.



The user should be able to understand the entire document structure.



Do not reduce an existing multi-function tool to one icon.



Do not add fake functionality.



Reuse actual existing functionality.



==================================================

20\. PAGE ORGANIZATION LAYOUT

==================================================



A good Organize mode can use:



Top toolbar:



page management commands



Main viewer:



page thumbnail grid or page organizer



Context panel:



selected page information/actions where appropriate



The user should be able to:



select pages



see selected state



perform actions



understand document order



All actions should be visually clear.



Do not create an unrelated separate application window.



==================================================

21\. COMMENT MODE

==================================================



Comment mode should not show only one boring icon.



It should expose existing comment functionality through contextual controls.



Primary comment options should be easy to understand.



Examples:



Sticky note



Text comment



Highlight



Underline



Strikethrough



Text box



Pen/drawing



Only expose options that actually exist.



Use progressive disclosure.



Click Comment.



Then show comment tools in the top toolbar.



Do not display all settings all the time.



==================================================

22\. HIGHLIGHTING

==================================================



Highlight must work like a real PDF annotation workflow.



Correct workflow:



1\. User selects text.

2\. Selection becomes clearly visible.

3\. A contextual highlight action becomes available.

4\. User chooses Highlight.

5\. Highlight is applied precisely over the selected text.

6\. The annotation remains visible.

7\. The selected highlight color becomes the remembered color for future highlight actions.



The UI must clearly indicate the current highlight color.



Do not make the user repeatedly choose a color if the same color was already selected.



Do not show a highlight tool that appears active forever.



==================================================

23\. HIGHLIGHT COLOR

==================================================



When Highlight is selected:



Expose a compact color selector.



Example:



Yellow



Green



Blue



Pink



Other existing supported colors.



The selector should be secondary to the main Highlight button.



Do not display a large palette permanently.



Remember the last selected color.



When the user returns to Highlight:



restore the last used color.



==================================================

24\. TEXT SELECTION TOOL STATE

==================================================



Text selection must not become permanently stuck.



If the user:



selects Highlight



highlights text



then presses Escape



the selection/tool state must return to a sensible default.



Escape should cancel temporary tool modes where appropriate.



Clicking another mode should also cancel incompatible temporary states.



Do not allow a selected tool to remain active forever just because the user once clicked it.



==================================================

25\. ESCAPE BUTTON

==================================================



Audit Escape behavior across the application.



Escape should appropriately cancel:



• temporary tool mode

• active text selection

• open popover

• open menu

• contextual action

• temporary editing state

• modal state



Do not break legitimate native Escape behavior.



Define a clear hierarchy:



Close popover



then cancel temporary tool state



then clear selection where appropriate



then close contextual panel if appropriate



Do not make Escape unpredictable.



==================================================

26\. TEXT EDITING UI

==================================================



Text editing currently looks like a completely different application.



That is unacceptable.



Text editing must remain inside the main PDF workspace.



Do not open a strange disconnected window.



Do not switch to unrelated typography.



Do not use a different visual theme.



The user should remain inside the same viewer shell.



Click Edit.



The top toolbar changes to Edit controls.



The PDF remains visible.



The editing interaction occurs directly on the PDF.



The UI chrome remains consistent.



==================================================

27\. TEXT EDITING CONTROLS

==================================================



When Edit is selected, provide the existing editing controls through the contextual toolbar.



At minimum, expose the capabilities the current application already supports.



Do not invent font controls that the product does not support.



Do not change the document's actual typography merely because editing mode opened.



The editing UI must visually match the viewer UI.



==================================================

28\. ANNOTATION UI

==================================================



Annotations must feel native to the main PDF workspace.



When an annotation is selected:



• selection should be clear

• relevant controls should appear

• Escape should deselect/cancel

• clicking another tool should transition cleanly

• the document should never disappear



Do not force the user into a separate annotation page.



==================================================

29\. PEN / DRAWING

==================================================



Where drawing is already supported:



Click the drawing/pen tool.



Reveal related existing options in the top contextual toolbar.



The tool must show a clear active state.



When the drawing operation ends:



Do not leave the drawing tool permanently selected unless the user explicitly uses a persistent mode.



Escape should provide a clean exit from temporary drawing mode.



==================================================

30\. SEARCH

==================================================



Search must remain inside the viewer.



Ctrl+F should:



• open search

• focus the input

• show result count

• highlight matches correctly

• provide next/previous

• close cleanly with Escape



Search count must be accurate.



Do not show duplicate counts.



Do not show three matches when there are two.



The UI must accurately reflect actual results.



==================================================

31\. DOCUMENT TABS

==================================================



Tabs must be completely integrated into the viewer.



The first tab currently has a layout collision problem.



Do not allow tab text to hide underneath the left rail.



The layout must be:



left rail



→ tab region



→ tab content



Never:



tab region underneath left rail.



The active tab must have a clear blue accent.



The tab strip must not be pure black.



Inactive tabs must be quieter.



Tab close controls must remain accessible.



==================================================

32\. PAGE MEMORY

==================================================



The application must remember the last meaningful page.



Example:



Open PDF.



Go to page 7.



Close.



Open the same PDF again.



It should return to page 7 rather than page 1.



Where technically possible also restore:



zoom



scroll position



reading mode



Do not reset the reader unnecessarily.



==================================================

33\. INITIAL ZOOM

==================================================



The application currently opens documents too small.



Fix the default presentation.



Use a comfortable viewer default such as fit width where appropriate.



Do not make the user manually zoom every time.



If a saved zoom exists, restore it.



==================================================

34\. TOUCHPAD ZOOM

==================================================



This remains unresolved and is a HIGH PRIORITY BUG.



Two finger scrolling currently works.



Pinch zoom does not.



Fix it at the viewer interaction level.



Required:



Two finger scroll



→ scroll



Pinch



→ zoom



Ctrl + wheel



→ zoom



Plain wheel



→ scroll



Do not gate zoom behind text editing.



Do not create a second fake zoom engine.



Trace the real WebView and viewer event flow.



Test on the actual Windows touchpad.



==================================================

35\. 100 PERCENT ZOOM

==================================================



Correct the meaning of 100%.



Do not merely change the number.



The PDF must render at the correct physical scale according to the viewer.



Test:



Fit width



Fit page



100%



150%



200%



The document should visibly behave correctly.



==================================================

36\. RIGHT SIDE VIEWER CONTROLS

==================================================



The right side should be useful.



It can contain:



• compact page navigation

• zoom controls

• page indicator

• existing document side utilities

• bookmarks

• attachments

• other existing viewer controls



Do not make it enormous.



Do not hide everything in the bottom bar anymore.



The goal is to reclaim document height while keeping controls easy to reach.



==================================================

37\. RESPONSIVE BEHAVIOR

==================================================



Use the full desktop window intelligently.



At 1280px:



document remains usable



toolbar remains accessible



sidebars remain reasonable



At 1440px and larger:



document should become significantly larger



quick tools can expand into multiple columns



home content should use more width



At reduced widths:



secondary controls should move into menus



optional panels should collapse



Do not let the interface become cramped.



==================================================

38\. HOME PAGE VISUAL COMPARISON

==================================================



Compare the PDF Elite home page against the provided professional reference.



Pay attention to:



left navigation



primary open/create actions



quick tools placement



quick tools density



recent files area



horizontal usage of space



vertical rhythm



icon quality



typography



background



section hierarchy



The target is not a literal copy.



The target is professional product quality.



==================================================

39\. DO NOT BREAK OFFLINE FUNCTIONALITY

==================================================



The application is intended to be fully offline.



Do not add network dependencies.



Do not require login.



Do not require cloud.



Do not require Google Drive.



Do not require mobile upload.



Do not call online services just for UI.



Do not break local file opening.



Do not break local PDF processing.



==================================================

40\. SAFE REMOVAL OF DEAD CODE

==================================================



For dead Stirling/cloud UI:



First trace dependencies.



Then remove or disable safely.



Confirm:



• no imports break

• no routing breaks

• no state assumptions break

• no file picker breaks

• no desktop builds break

• no local storage breaks



Do not use a blind global search and replace.



Do not delete large portions of shared code simply because a label is visible.



==================================================

41\. REBRANDING SAFETY

==================================================



Rebrand visible UI carefully.



Create:



PDF Elite



branding



Blue accent



New application icon



But preserve internal technical identifiers where required for compatibility.



Before renaming:



Search for all important Stirling references.



Classify them.



Only alter what is safe.



After rebranding:



test:



home



viewer



dialogs



title bar



desktop window title



installer



app icon



file opening



backend startup



Do not allow branding changes to cause runtime failure.



==================================================

42\. DO NOT CREATE PARALLEL UI

==================================================



Do not create a second viewer shell.



Do not create a second toolbar system that duplicates the current viewer.



Modify existing architecture where possible.



Reuse:



viewer



toolbar



tabs



navigation



search



zoom



annotation



organize



file state



This should become one coherent product.



==================================================

43\. DO NOT REMOVE EXISTING FEATURES

==================================================



The application already has many PDF capabilities.



Do not reduce them simply because the UI becomes cleaner.



The goal is:



Hide complexity visually.



Not:



Delete functionality.



If a category currently has ten relevant options, those ten options must remain accessible through a professional contextual workflow.



The user should see fewer things at once, not lose capability.



==================================================

44\. PROGRESSIVE DISCLOSURE

==================================================



The core interaction model should be:



Major mode



→ sub tools



→ settings



Example:



Comment



→ Highlight



→ color



Example:



Organize



→ Rotate / Delete / Reorder / Extract / Insert etc.



Example:



View



→ Zoom / Fit / Rotate / Fullscreen



Example:



Search



→ search input / result navigation



This is how complexity should be managed.



==================================================

45\. TOOL STATE MODEL

==================================================



Temporary tools must have lifecycle states.



For every temporary tool define:



Inactive



Hover



Active



Operating



Completed



Cancelled



The state must return to a clean default after completion where appropriate.



Escape must always have an intentional effect.



Clicking another primary mode must clear incompatible temporary states.



No tool should remain visually selected forever accidentally.



==================================================

46\. VISUAL QUALITY

==================================================



Perform a global quality pass.



Check every:



icon



button



toolbar



sidebar



tab



heading



label



panel



control



popover



dialog



empty state



loading state



error state



The application should use one coherent visual language.



Do not allow some areas to look like Stirling while others look like PDF Elite.



==================================================

47\. DESIGN SYSTEM

==================================================



Use the provided skill file to establish:



semantic colors



spacing



typography



icon language



button states



hover states



active states



focus states



panel treatment



tab treatment



motion



density



accessibility



Use the blue accent consistently.



Do not create random colors.



Do not create random radii.



Do not create random icon styles.



==================================================

48\. BUILD DISCIPLINE

==================================================



Do NOT run a clean build during implementation.



Do NOT:



`gradlew clean`



delete target



delete node\_modules



delete caches



delete Rust build outputs



delete frontend build outputs



Use incremental development.



Use HMR.



Run targeted checks after meaningful changes.



Only perform one final production desktop build after the redesign is visually complete and manually tested.



==================================================

49\. TEST THE ACTUAL APPLICATION

==================================================



Do not claim completion because code compiles.



Actually launch the application.



Test:



Home



Open file



Remove dead cloud options



Open PDF



Tabs



View



Comment



Edit



Organize



Search



Highlight



Notes



Pen



Page navigation



Zoom



Touchpad pinch



Ctrl wheel



Escape



Close tool



Reopen PDF



Page restoration



Initial zoom



100%



Fullscreen



Resize



Rebrand



Icon



==================================================

50\. FINAL ACCEPTANCE STANDARD

==================================================



Do not declare this redesign complete unless the result is visibly close to the quality level of the professional reference.



The application should have:



• polished home page

• useful left home navigation

• no dead cloud UI

• no unnecessary sign in

• strong Quick Tools layout

• professional icons

• correct typography

• professional document tabs

• large PDF workspace

• useful left viewer navigation

• rich contextual top toolbar

• useful right controls

• no oversized bottom bar

• functional page organization

• professional comment workflow

• reliable highlighting

• remembered annotation settings

• integrated text editing

• reliable Escape behavior

• accurate search

• page position memory

• comfortable initial zoom

• correct 100% zoom

• real touchpad pinch zoom

• blue accent

• PDF Elite branding

• PDF Elite icon

• safe Stirling decoupling at the visible UI level

• fully offline core workflow



The most important test is visual:



Launch the application.



Look at the home screen.



Then open a PDF.



The application should immediately feel like a professional desktop PDF product.



If it still looks like the current screenshots, the redesign is not complete.



==================================================

51\. PROGRESS REPORTING

==================================================



Work through this prompt systematically.



After completing each major numbered section, report:



`0 finished`

`1 finished`

`2 finished`

`3 finished`



and so on.



Only mark a section finished after it has actually been implemented and verified.



Do not mark a section finished because:



• code was edited

• a component was created

• CSS was added

• TypeScript passed

• the build succeeded



Visual and functional verification is required.



==================================================

52\. FINAL RULE

==================================================



Do not optimize for finishing quickly.



Optimize for:



professional quality



correct behavior



visual consistency



document focus



offline reliability



safe rebranding



and a polished desktop PDF experience.



Do not give me another shallow redesign.



Do not create an implementation plan as a replacement for this prompt.



Use this prompt and the supplied `pdf-viewer-ui-ux-skill.md` as the specification.



Make the changes in the existing application carefully and incrementally. do not build the app until i say. just notice me all improvements done or not


package stirling.software.SPDF.controller.api;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDDocumentCatalog;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageTree;
import org.apache.pdfbox.pdmodel.interactive.documentnavigation.outline.PDDocumentOutline;
import org.apache.pdfbox.pdmodel.interactive.documentnavigation.outline.PDOutlineItem;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import stirling.software.common.service.CustomPDFDocumentFactory;

/**
 * Restores EditTableOfContentsController functionality expected by tests.
 * Minimal but faithful implementation that uses the PDF outline to extract bookmarks.
 */
public class EditTableOfContentsController {

    public static class BookmarkItem {
        public final String title;
        public final int pageNumber;
        public final List<BookmarkItem> children;

        public BookmarkItem(String title, int pageNumber, List<BookmarkItem> children) {
            this.title = title;
            this.pageNumber = pageNumber;
            this.children = children;
        }
    }

    private final CustomPDFDocumentFactory pdfDocumentFactory;

    public EditTableOfContentsController(CustomPDFDocumentFactory pdfDocumentFactory) {
        this.pdfDocumentFactory = pdfDocumentFactory;
    }

    /**
     * Extracts top-level bookmarks as a list of maps containing title, pageNumber and children.
     * Tests call this method directly.
     */
    public ResponseEntity<List<Map<String, Object>>> extractBookmarks(MultipartFile file)
            throws IOException {
        PDDocument doc = null;
        try {
            doc = pdfDocumentFactory.load(file);
            PDDocumentCatalog catalog = doc.getDocumentCatalog();
            PDDocumentOutline outline = catalog == null ? null : catalog.getDocumentOutline();
            if (outline == null) {
                return ResponseEntity.ok(new ArrayList<>());
            }

            List<Map<String, Object>> result = new ArrayList<>();
            PDOutlineItem current = outline.getFirstChild();
            while (current != null) {
                Map<String, Object> entry = new HashMap<>();
                String title = current.getTitle();
                entry.put("title", title == null ? "" : title);

                PDPage destPage = current.findDestinationPage(doc);
                int pageIndex = 0;
                if (destPage != null) {
                    PDPageTree pages = doc.getPages();
                    pageIndex = pages.indexOf(destPage);
                }
                entry.put("pageNumber", pageIndex + 1);
                entry.put("children", new ArrayList<>());
                result.add(entry);
                current = current.getNextSibling();
            }
            return ResponseEntity.ok(result);
        } finally {
            if (doc != null) {
                try {
                    doc.close();
                } catch (Exception ignored) {
                }
            }
        }
    }
}

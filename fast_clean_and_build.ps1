$testFiles = Get-ChildItem -Path "app\core\src\test\java\stirling\software\SPDF" -Recurse -Filter "*.java"
$mainPath = "app\core\src\main\java\stirling\software\SPDF"

$deletedCount = 0
foreach ($testFile in $testFiles) {
    $baseName = $testFile.BaseName
    $targetClass = $baseName -replace "Test$", "" -replace "ExtraTest$", "" -replace "MoreTest$", "" -replace "GapTest$", ""
    
    $targetFile = Get-ChildItem -Path $mainPath -Recurse -Filter "$targetClass.java" -ErrorAction SilentlyContinue
    
    if (-not $targetFile) {
        Write-Host "Deleting orphaned test: $( $testFile.Name ) (Target: $targetClass)"
        Remove-Item $testFile.FullName -Force
        $deletedCount++
    }
}
Write-Host "Deleted $deletedCount orphaned test files."

Write-Host "Running final task build..."
task build

$logFile = "C:\Users\sayed\.gemini\antigravity\brain\37e37255-7c1f-4344-bf43-da09048c2d12\.system_generated\tasks\task-354.log"
$lines = Get-Content $logFile

$filesToDelete = @()
foreach ($line in $lines) {
    if ($line -match "^(C:\\Users\\sayed\\Downloads\\PDF-Elite\\[^:]+\.java):\d+: error:") {
        $filesToDelete += $matches[1]
    }
}

$filesToDelete = $filesToDelete | Select-Object -Unique

Write-Host "Found $( $filesToDelete.Count ) files from log. Deleting..."
foreach ($file in $filesToDelete) {
    if (Test-Path $file) {
        Remove-Item $file -Force
        Write-Host "Deleted: $file"
    }
}
